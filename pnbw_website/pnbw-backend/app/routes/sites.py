from flask import Blueprint, request, jsonify
from app import db
from app.models import Property, User
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from sqlalchemy import or_

sites_bp = Blueprint('sites', __name__)

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

@sites_bp.route('/manage/all', methods=['GET'])
@admin_required()
def admin_get_all_sites():
    """Admin: Get all properties (published, draft, active, inactive)."""
    sites = Property.query.all()
    return jsonify([s.to_dict() for s in sites]), 200

@sites_bp.route('/manage/review-queue', methods=['GET'])
@admin_required()
def admin_get_review_queue():
    """Admin: Get properties pending review (not yet published)."""
    queue = Property.query.filter_by(published=False).all()
    return jsonify([s.to_dict() for s in queue]), 200

@sites_bp.route('/manage/<int:site_id>/publish', methods=['PUT'])
@admin_required()
def admin_publish_site(site_id):
    """Admin: Publish a site from review queue."""
    site = Property.query.get(site_id)
    if not site:
        return jsonify({'message': 'Site not found'}), 404
    
    site.published = True
    site.active = True # Automatically active when published
    db.session.commit()
    return jsonify(site.to_dict()), 200

@sites_bp.route('/manage/<int:site_id>/mark-sold', methods=['PUT'])
@admin_required()
def admin_mark_site_sold(site_id):
    """Admin: Mark a site as sold (inactive)."""
    site = Property.query.get(site_id)
    if not site:
        return jsonify({'message': 'Site not found'}), 404
    
    site.active = False
    db.session.commit()
    return jsonify(site.to_dict()), 200

@sites_bp.route('/manage/<int:site_id>/toggle-popular', methods=['PUT'])
@admin_required()
def admin_toggle_site_popular(site_id):
    """Admin: Toggle a site's popular status."""
    site = Property.query.get(site_id)
    if not site:
        return jsonify({'message': 'Site not found'}), 404
    
    site.popular = not site.popular
    db.session.commit()
    return jsonify(site.to_dict()), 200

@sites_bp.route('/manage/<int:site_id>', methods=['DELETE'])
@admin_required()
def admin_delete_site(site_id):
    """Admin: Delete a site."""
    site = Property.query.get(site_id)
    if not site:
        return jsonify({'message': 'Site not found'}), 404
    
    db.session.delete(site)
    db.session.commit()
    return jsonify({'message': 'Site deleted successfully'}), 200

@sites_bp.route('/manage/<int:site_id>', methods=['PUT'])
@admin_required()
def admin_update_site(site_id):
    """Admin: Update site details."""
    site = Property.query.get(site_id)
    if not site:
        return jsonify({'message': 'Site not found'}), 404

    data = request.get_json()
    # Update fields based on data. Add more fields as needed.
    site.title = data.get('title', site.title)
    site.description = data.get('description', site.description)
    site.property_type = data.get('propertyType', site.property_type)
    site.price = data.get('price', site.price)
    site.units = data.get('units', site.units)
    site.bedrooms = data.get('bedrooms', site.bedrooms)
    site.bathrooms = data.get('bathrooms', site.bathrooms)
    site.furnishing = data.get('furnishing', site.furnishing)
    site.possession = data.get('possession', site.possession)
    site.built_year = data.get('builtYear', site.built_year)
    site.locality = data.get('locality', site.locality)
    site.city = data.get('city', site.city)
    site.lat = data.get('lat', site.lat)
    site.lng = data.get('lng', site.lng)
    site.images = json.dumps(data.get('images', json.loads(site.images))) # Handle images as JSON string
    site.videos = json.dumps(data.get('videos', json.loads(site.videos))) # Handle videos as JSON string
    site.amenities = json.dumps(data.get('amenities', json.loads(site.amenities))) # Handle amenities as JSON string
    site.published = data.get('published', site.published)
    site.active = data.get('active', site.active)
    site.popular = data.get('popular', site.popular)
    
    db.session.commit()
    return jsonify(site.to_dict()), 200