from flask import Blueprint, jsonify, request
from app import db
from app.models import User, Broker, Property, Enquiry
from flask_jwt_extended import jwt_required, get_jwt_identity

admin_bp = Blueprint('admin', __name__)

# Decorator to ensure user is admin (reusable logic)
def admin_required():
    def wrapper(fn):
        @jwt_required()
        def decorator(*args, **kwargs):
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if not user or user.role != 'admin':
                return jsonify({'message': 'Admin access required'}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

@admin_bp.route('/dashboard/stats', methods=['GET'])
@admin_required()
def get_admin_dashboard_stats():
    """Admin: Get overall dashboard statistics."""
    total_users = User.query.count()
    total_brokers = Broker.query.count()
    total_properties = Property.query.count()
    published_properties = Property.query.filter_by(published=True).count()
    pending_review_properties = Property.query.filter_by(published=False).count()
    total_enquiries = Enquiry.query.count()
    pending_enquiries = Enquiry.query.filter_by(status='pending').count()

    return jsonify({
        'totalUsers': total_users,
        'totalBrokers': total_brokers,
        'totalProperties': total_properties,
        'publishedProperties': published_properties,
        'pendingReviewProperties': pending_review_properties,
        'totalEnquiries': total_enquiries,
        'pendingEnquiries': pending_enquiries
    }), 200

# Admin broker management (delegated to brokers_bp.manage routes)
# Admin site management (delegated to sites_bp.manage routes)
# Admin enquiry management (delegated to enquiries_bp.all routes)