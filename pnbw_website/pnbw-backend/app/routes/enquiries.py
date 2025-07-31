from flask import Blueprint, request, jsonify
from app import db
from app.models import Enquiry, User, Property
from flask_jwt_extended import jwt_required, get_jwt_identity

enquiries_bp = Blueprint('enquiries', __name__)

@enquiries_bp.route('/submit', methods=['POST'])
@jwt_required() # User must be logged in to submit an enquiry
def submit_enquiry():
    """Submit a new enquiry."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.get_json()
    property_id = data.get('propertyId')
    message = data.get('message')

    if not property_id or not message:
        return jsonify({'message': 'Missing property ID or message'}), 400

    property = Property.query.get(property_id)
    if not property:
        return jsonify({'message': 'Property not found'}), 404

    new_enquiry = Enquiry(
        user_id=user.id,
        property_id=property_id,
        message=message,
        status='pending'
    )
    db.session.add(new_enquiry)
    db.session.commit()

    # In a real app, you'd also trigger an email notification to admin/broker here
    # using your email service (e.g., from app.services.email_service)

    return jsonify(new_enquiry.to_dict()), 201

# --- Admin/Broker Enquiry Management Endpoints ---
@enquiries_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_enquiries():
    """Admin: Get all enquiries."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user or user.role != 'admin':
        return jsonify({'message': 'Access denied: Admin role required'}), 403

    enquiries = Enquiry.query.all()
    return jsonify([e.to_dict() for e in enquiries]), 200

@enquiries_bp.route('/<int:enquiry_id>', methods=['GET'])
@jwt_required()
def get_enquiry(enquiry_id):
    """Admin/Broker: Get a single enquiry by ID."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    enquiry = Enquiry.query.get(enquiry_id)
    if not enquiry:
        return jsonify({'message': 'Enquiry not found'}), 404

    # Admins can see any enquiry
    if user.role == 'admin':
        return jsonify(enquiry.to_dict()), 200
    # Brokers can only see enquiries related to properties they submitted or are assigned
    elif user.role == 'broker':
        broker = Broker.query.filter_by(user_id=user.id).first()
        if not broker:
            return jsonify({'message': 'Broker profile not found'}), 403
        
        if enquiry.property_details.submitted_by_broker_id == broker.id or \
           enquiry.assigned_broker_id == broker.id:
            return jsonify(enquiry.to_dict()), 200
        else:
            return jsonify({'message': 'Access denied: Not your enquiry'}), 403
    else:
        return jsonify({'message': 'Access denied'}), 403

@enquiries_bp.route('/<int:enquiry_id>/status', methods=['PUT'])
@jwt_required()
def update_enquiry_status(enquiry_id):
    """Admin/Broker: Update enquiry status."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    enquiry = Enquiry.query.get(enquiry_id)
    if not enquiry:
        return jsonify({'message': 'Enquiry not found'}), 404

    if user.role == 'admin':
        pass # Admin can update any
    elif user.role == 'broker':
        broker = Broker.query.filter_by(user_id=user.id).first()
        if not broker or (enquiry.property_details.submitted_by_broker_id != broker.id and \
                           enquiry.assigned_broker_id != broker.id):
            return jsonify({'message': 'Access denied: Not authorized to update this enquiry'}), 403
    else:
        return jsonify({'message': 'Access denied'}), 403

    data = request.get_json()
    new_status = data.get('status')
    if new_status not in ['pending', 'contacted', 'closed']:
        return jsonify({'message': 'Invalid status'}), 400
    
    enquiry.status = new_status
    db.session.commit()
    return jsonify(enquiry.to_dict()), 200

@enquiries_bp.route('/<int:enquiry_id>/assign', methods=['PUT'])
@jwt_required()
def assign_enquiry(enquiry_id):
    """Admin: Assign an enquiry to a broker."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user or user.role != 'admin':
        return jsonify({'message': 'Access denied: Admin role required'}), 403

    enquiry = Enquiry.query.get(enquiry_id)
    if not enquiry:
        return jsonify({'message': 'Enquiry not found'}), 404

    data = request.get_json()
    broker_id = data.get('brokerId')
    if broker_id is None:
        return jsonify({'message': 'Missing brokerId'}), 400

    broker = Broker.query.get(broker_id)
    if not broker:
        return jsonify({'message': 'Broker not found'}), 404
    
    enquiry.assigned_broker_id = broker_id
    db.session.commit()
    return jsonify(enquiry.to_dict()), 200