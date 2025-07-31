from flask import Blueprint, request, jsonify
from app import db
from app.models import User, Broker
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone') # Get phone number from signup

    if not username or not email or not password:
        return jsonify({'message': 'Missing username, email, or password'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 409
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered'}), 409

    new_user = User(username=username, email=email, phone=phone)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    # If the user is signing up as a broker, create a Broker entry
    # This logic might be more complex in a real app (e.g., admin approval)
    if data.get('is_broker'):
        new_broker = Broker(
            user_id=new_user.id,
            name=username, # Use username as broker name for simplicity
            email=email,
            phone=phone, # Use phone from signup
            experience_years=data.get('experience_years', 0),
            operating_locations=data.get('operating_locations', ''),
            referral_code=f"PNBW-{new_user.id}" # Simple referral code
        )
        db.session.add(new_broker)
        db.session.commit()
        new_user.role = 'broker' # Update user role
        db.session.commit()


    return jsonify({'message': 'User created successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=24)) # Token valid for 24 hours
    
    # Get broker details if user is a broker
    broker_details = None
    if user.role == 'broker':
        broker = Broker.query.filter_by(user_id=user.id).first()
        if broker:
            broker_details = broker.to_dict()

    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'phone': user.phone,
            'broker_details': broker_details # Include broker details
        }
    }), 200

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({'message': f'Hello, {user.username}! You are authenticated with role {user.role}.'}), 200

# Add a route to get user details by ID (for frontend to populate user info in enquiry)
@auth_bp.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user.to_dict()), 200