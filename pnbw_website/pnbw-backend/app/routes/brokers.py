from flask import Blueprint, request, jsonify
from app import db
from app.models import Broker, Property, Enquiry, User
from flask_jwt_extended import jwt_required, get_jwt_identity

brokers_bp = Blueprint('brokers', __name__)

# --- Public/General Broker Endpoints ---
@brokers_bp.route('/', methods=['GET'])
def get_all_brokers():
    """Get a list of all active brokers (publicly visible)."""
    brokers = Broker.query.filter_by(active=True).all()
    return jsonify([b.to_dict() for b in brokers]), 200

@brokers_bp.route('/<int:broker_id>', methods=['GET'])
def get_broker(broker_id):
    """Get a single broker by ID."""
    broker = Broker.query.get(broker_id)
    if not broker or not broker.active:
        return jsonify({'message': 'Broker not found or inactive'}), 404
    return jsonify(broker.to_dict()), 200

# --- Broker Dashboard Endpoints (Requires Authentication) ---
@brokers_bp.route('/dashboard/stats', methods=['GET'])
@jwt_required()
def get_broker_stats():
    """Get stats for the current logged-in broker."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role != 'broker':
        return jsonify({'message': 'Access denied: Not a broker'}), 403

    broker = Broker.query.filter_by(user_id=user.id).first()
    if not broker:
        return jsonify({'message': 'Broker profile not found'}), 404

    total_listings = Property.query.filter_by(submitted_by_broker_id=broker.id).count()
    active_listings = Property.query.filter_by(submitted_by_broker_id=broker.id, active=True).count()
    
    # Enquiries for this broker's properties
    # This might be better handled by a dedicated enquiries API or joined query
    # For simplicity, we'll count all enquiries where the property was submitted by this broker
    # Or where the enquiry is assigned to this broker
    total_enquiries = Enquiry.query.join(Property, Enquiry.property_id == Property.id)\
                                  .filter(Property.submitted_by_broker_id == broker.id).count()
    
    return jsonify({
        'referrals': broker.total_referrals,
        'code': broker.referral_code,
        'profit': broker.profit_earned,
        'totalListings': total_listings,
        'activeListings': active_listings,
        'totalEnquiries': total_enquiries # Total enquiries related to this broker's properties
    }), 200

@brokers_bp.route('/dashboard/listings', methods=['GET'])
@jwt_required()
def get_broker_listings():
    """Get listings submitted by the current logged-in broker."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role != 'broker':
        return jsonify({'message': 'Access denied: Not a broker'}), 403

    broker = Broker.query.filter_by(user_id=user.id).first()
    if not broker:
        return jsonify({'message': 'Broker profile not found'}), 404

    listings = Property.query.filter_by(submitted_by_broker_id=broker.id).all()
    return jsonify([p.to_dict() for p in listings]), 200

# --- Admin Broker Management Endpoints (Requires Admin Role) ---
@brokers_bp.route('/manage', methods=['GET'])
@jwt_required()
def admin_get_all_brokers():
    """Admin: Get all brokers (active/inactive)."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role != 'admin':
        return jsonify({'message': 'Access denied: Admin role required'}), 403

    brokers = Broker.query.all()
    return jsonify([b.to_dict() for b in brokers]), 200

@brokers_bp.route('/manage/add', methods=['POST'])
@jwt_required()
def admin_add_broker():
    """Admin: Add a new broker."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role != 'admin':
        return jsonify({'message': 'Access denied: Admin role required'}), 403

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone') # Get phone number

    if not name or not email or not phone:
        return jsonify({'message': 'Missing name, email, or phone'}), 400

    if Broker.query.filter_by(email=email).first():
        return jsonify({'message': 'Broker with this email already exists'}), 409

    # Optionally create a new User account for the broker, or link to existing
    # For simplicity, let's assume admin adds broker details here, and user link is optional
    new_broker = Broker(name=name, email=email, phone=phone, active=data.get('active', True),
                        experience_years=data.get('experience_years', 0),
                        operating_locations=data.get('operating_locations', ''))
    db.session.add(new_broker)
    db.session.commit()

    return jsonify(new_broker.to_dict()), 201

@brokers_bp.route('/manage/<int:broker_id>', methods=['PUT'])
@jwt_required()
def admin_update_broker(broker_id):
    """Admin: Update broker details."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role != 'admin':
        return jsonify({'message': 'Access denied: Admin role required'}), 403

    broker = Broker.query.get(broker_id)
    if not broker:
        return jsonify({'message': 'Broker not found'}), 404

    data = request.get_json()
    broker.name = data.get('name', broker.name)
    broker.email = data.get('email', broker.email)
    broker.phone = data.get('phone', broker.phone)
    broker.active = data.get('active', broker.active)
    broker.experience_years = data.get('experience_years', broker.experience_years)
    broker.operating_locations = data.get('operating_locations', broker.operating_locations)
    # Update other fields as needed

    db.session.commit()
    return jsonify(broker.to_dict()), 200

@brokers_bp.route('/manage/<int:broker_id>', methods=['DELETE'])
@jwt_required()
def admin_delete_broker(broker_id):
    """Admin: Delete a broker."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role != 'admin':
        return jsonify({'message': 'Access denied: Admin role required'}), 403

    broker = Broker.query.get(broker_id)
    if not broker:
        return jsonify({'message': 'Broker not found'}), 404

    db.session.delete(broker)
    db.session.commit()
    return jsonify({'message': 'Broker deleted successfully'}), 200