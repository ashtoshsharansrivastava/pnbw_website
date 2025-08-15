# routes/auth.py
import random
import smtplib
from email.mime.text import MIMEText
from flask import Blueprint, request, jsonify, redirect, url_for
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import os

from app import db # Assuming 'db' is initialized in app.py
from models import User, Broker # Import your models

# Import Twilio if you're using it for real SMS
# from twilio.rest import Client
# twilio_client = Client(os.environ.get('TWILIO_ACCOUNT_SID'), os.environ.get('TWILIO_AUTH_TOKEN'))


auth_bp = Blueprint('auth', __name__)

# Hardcoded admin credentials (for testing and initial setup)
ADMIN_PHONE = '8005431236'
ADMIN_EMAIL = 'ashutoshsharansrivastava@gmail.com'

# Helper for sending email (replace with actual integration like SendGrid/Mailgun)
def send_email(to_email, subject, body):
    # In a real application, integrate with a robust email service
    # This is a basic SMTP example, requires SMTP server details in config.py
    msg = MIMEText(body, 'html')
    msg['Subject'] = subject
    msg['From'] = os.environ.get('EMAIL_FROM')
    msg['To'] = to_email

    try:
        with smtplib.SMTP(os.environ.get('EMAIL_HOST'), os.environ.get('EMAIL_PORT')) as server:
            server.starttls()
            server.login(os.environ.get('EMAIL_USERNAME'), os.environ.get('EMAIL_PASSWORD'))
            server.send_message(msg)
        print(f"Email sent to {to_email}")
        return True
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")
        return False

# Helper for sending SMS (replace with actual Twilio integration)
def send_sms(to_phone, message):
    # In a real application, integrate with a robust SMS service like Twilio
    print(f"SMS sent to {to_phone}: {message}")
    # Example Twilio usage:
    # try:
    #     twilio_client.messages.create(
    #         to=to_phone,
    #         from_=os.environ.get('TWILIO_PHONE_NUMBER'),
    #         body=message
    #     )
    #     print(f"SMS sent to {to_phone}")
    #     return True
    # except Exception as e:
    #     print(f"Failed to send SMS to {to_phone}: {e}")
    #     return False
    return True # Simulate success for now

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password') # Only for email signup, if applicable
    phone = data.get('phone')
    requested_role = data.get('role', 'customer') # Default to customer
    is_broker_signup = data.get('is_broker', False) # Check if it's a broker signup intent

    if not name:
        return jsonify({'message': 'Missing name'}), 400

    if email and User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered'}), 409
    if phone and User.query.filter_by(phone=phone).first():
        return jsonify({'message': 'Phone number already registered'}), 409
    
    if not email and not phone:
        return jsonify({'message': 'Either email or phone is required for signup'}), 400

    # Determine the actual role
    final_role = requested_role
    if phone == ADMIN_PHONE or email == ADMIN_EMAIL:
        final_role = 'admin'
    elif is_broker_signup:
        final_role = 'agent' # Or 'broker', align with your enum

    new_user = User(name=name, email=email, phone=phone, role=final_role)
    if password:
        new_user.set_password(password) # Hash password only if provided (for email/password logins)
    
    db.session.add(new_user)
    db.session.commit()

    if is_broker_signup and final_role == 'agent': # Ensure role is correctly set to agent for broker record
        # Create a Broker entry
        new_broker = Broker(
            user_id=new_user.id,
            name=name,
            email=email,
            phone=phone,
            experience_years=data.get('experience_years', 0),
            operating_locations=data.get('operating_locations', ''),
            referral_code=f"PNBW-{new_user.id}" # Simple referral code
        )
        db.session.add(new_broker)
        db.session.commit()
        # User's role is already set above, no need to update again

    return jsonify({'message': 'User created successfully', 'user_id': new_user.id, 'role': new_user.role}), 201

# --- Phone/OTP Login Flow ---
@auth_bp.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    phone = data.get('phone')
    requested_role = data.get('role', 'customer')

    if not phone:
        return jsonify({'message': 'Phone number is required.'}), 400

    user = User.query.filter_by(phone=phone).first()

    if not user:
        # If user doesn't exist, create a new one with the requested role
        # Note: In a real app, you might want a separate registration flow
        final_role = requested_role
        if phone == ADMIN_PHONE:
            final_role = 'admin'
        user = User(name=f"User-{phone}", phone=phone, role=final_role) # Placeholder name
        db.session.add(user)
        db.session.commit()
    else:
        # Update user's role if phone matches admin or agent criteria
        if phone == ADMIN_PHONE and user.role != 'admin':
            user.role = 'admin'
            db.session.commit()
        # Add similar logic for agent role if needed during login based on phone number history

    user.generate_otp()
    db.session.commit()

    if send_sms(phone, f"Your PNBW OTP is: {user.otp}"):
        return jsonify({'message': 'OTP sent successfully.'}), 200
    else:
        return jsonify({'message': 'Failed to send OTP. Please try again.'}), 500

@auth_bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    phone = data.get('phone')
    otp = data.get('otp')

    if not phone or not otp:
        return jsonify({'message': 'Phone number and OTP are required.'}), 400

    user = User.query.filter_by(phone=phone).first()

    if not user or not user.verify_otp(otp):
        return jsonify({'message': 'Invalid or expired OTP.'}), 401
    
    user.clear_otp()
    db.session.commit()

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=24))
    
    broker_details = None
    if user.role == 'agent': # Use 'agent' role for broker details
        broker = Broker.query.filter_by(user_id=user.id).first()
        if broker:
            broker_details = broker.to_dict()

    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'name': user.name,
            'phone': user.phone,
            'email': user.email, # Include email if available
            'role': user.role,
            'broker_details': broker_details
        },
        'message': 'Login successful.'
    }), 200

# --- Email/Magic Link Login Flow ---
@auth_bp.route('/send-magic-link', methods=['POST'])
def send_magic_link():
    data = request.get_json()
    email = data.get('email')
    requested_role = data.get('role', 'customer')

    if not email:
        return jsonify({'message': 'Email address is required.'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        # If user doesn't exist, create a new one with the requested role
        final_role = requested_role
        if email == ADMIN_EMAIL:
            final_role = 'admin'
        user = User(name=f"User-{email.split('@')[0]}", email=email, role=final_role) # Placeholder name
        db.session.add(user)
        db.session.commit()
    else:
        # Update user's role if email matches admin or agent criteria
        if email == ADMIN_EMAIL and user.role != 'admin':
            user.role = 'admin'
            db.session.commit()
        # Add similar logic for agent role if needed during login based on email history

    user.generate_magic_link_token()
    db.session.commit()

    magic_link_url = f"http://localhost:5000/api/auth/verify-magic-link?token={user.magic_link_token}" # Adjust frontend URL as needed
    email_body = f"""
    <p>Hello {user.name or 'User'},</p>
    <p>Click on the link below to log in to PNBW Real Estate:</p>
    <p><a href="{magic_link_url}">Log in to PNBW Real Estate</a></p>
    <p>This link is valid for 15 minutes.</p>
    <p>If you did not request this, please ignore this email.</p>
    """
    if send_email(email, "Your PNBW Magic Login Link", email_body):
        return jsonify({'message': 'Magic link sent. Check your email.'}), 200
    else:
        return jsonify({'message': 'Failed to send magic link email. Please try again.'}), 500

@auth_bp.route('/verify-magic-link', methods=['GET'])
def verify_magic_link():
    token = request.args.get('token')

    if not token:
        return "Magic link token missing.", 400

    user = User.query.filter_by(magic_link_token=token).first()

    if not user or not user.verify_magic_link_token(token):
        return "Invalid or expired magic link.", 401
    
    user.clear_magic_link_token()
    db.session.commit()

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=24))
    
    # In a real app, redirect to your frontend with the JWT in a secure way (e.g., cookie)
    # For now, redirect with token in URL for simplicity, but consider security implications.
    # You should configure your frontend to receive this token and then redirect.
    frontend_redirect_url = f"http://localhost:3000/login-success?token={access_token}&role={user.role}" # Adjust your frontend URL
    return redirect(frontend_redirect_url)

# --- Existing Routes (Modified) ---

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({'message': f'Hello, {user.name}! You are authenticated with role {user.role}.'}), 200

# Add a route to get user details by ID (for frontend to populate user info in enquiry)
@auth_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user.to_dict()), 200

# --- Role-based access control decorator ---
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def role_required(required_roles):
    def wrapper(fn):
        @jwt_required()
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims["role"] not in required_roles:
                return jsonify({"msg": "Missing or invalid role"}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

# Example of using role_required (uncomment to test)
# @auth_bp.route('/admin-only', methods=['GET'])
# @role_required(['admin'])
# def admin_only_route():
#     return jsonify({'message': 'Welcome, Admin!'}), 200

# @auth_bp.route('/agent-or-admin', methods=['GET'])
# @role_required(['agent', 'admin'])
# def agent_or_admin_route():
#     return jsonify({'message': 'Welcome, Agent or Admin!'}), 200