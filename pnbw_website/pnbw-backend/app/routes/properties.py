from flask import Blueprint, request, jsonify
from app import db
from app.models import Property, Broker
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from sqlalchemy import or_

properties_bp = Blueprint('properties', __name__)

@properties_bp.route('/', methods=['GET'])
def get_properties():
    """Get all published and active properties, with optional search and sort."""
    search_query = request.args.get('search', '').lower()
    sort_by = request.args.get('sort', 'popular')

    # Start with published and active properties
    query = Property.query.filter_by(published=True, active=True)

    if search_query:
        query = query.filter(or_(
            Property.title.ilike(f'%{search_query}%'),
            Property.locality.ilike(f'%{search_query}%'),
            Property.city.ilike(f'%{search_query}%'),
            Property.description.ilike(f'%{search_query}%')
        ))

    if sort_by == 'price-asc':
        query = query.order_by(Property.price.asc())
    elif sort_by == 'price-desc':
        query = query.order_by(Property.price.desc())
    elif sort_by == 'newest':
        query = query.order_by(Property.created_at.desc())
    elif sort_by == 'oldest':
        query = query.order_by(Property.created_at.asc())
    elif sort_by == 'location-asc':
        query = query.order_by(Property.city.asc(), Property.locality.asc())
    elif sort_by == 'location-desc':
        query = query.order_by(Property.city.desc(), Property.locality.desc())
    elif sort_by == 'popular':
        query = query.order_by(Property.popular.desc(), Property.views.desc()) # Popular first, then by views
    
    properties = query.all()
    return jsonify([p.to_dict() for p in properties]), 200

@properties_bp.route('/<int:property_id>', methods=['GET'])
def get_property(property_id):
    """Get a single property by ID."""
    property = Property.query.get(property_id)
    if not property or not property.published: # Only show published properties publicly
        return jsonify({'message': 'Property not found'}), 404
    
    # Increment views (optional, for public view)
    property.views += 1
    db.session.commit()

    return jsonify(property.to_dict()), 200

@properties_bp.route('/add', methods=['POST'])
@jwt_required() # Requires authentication to add property
def add_property():
    """Add a new property (can be done by broker or admin)."""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user or user.role not in ['admin', 'broker']:
        return jsonify({'message': 'Unauthorized to add property'}), 403

    data = request.get_json()
    
    # Basic validation (expand as needed)
    required_fields = ['title', 'description', 'propertyType', 'price', 'locality', 'city']
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    # Determine submitted_by_broker_id
    submitted_by_broker_id = None
    if user.role == 'broker':
        broker = Broker.query.filter_by(user_id=user.id).first()
        if broker:
            submitted_by_broker_id = broker.id
        else:
            return jsonify({'message': 'Broker profile not found for user'}), 400
    elif user.role == 'admin':
        # Admin can optionally specify submittedByBrokerId, or it's null
        submitted_by_broker_id = data.get('submittedByBrokerId') # If admin adds on behalf of a broker
        if submitted_by_broker_id:
            if not Broker.query.get(submitted_by_broker_id):
                return jsonify({'message': 'Specified broker not found'}), 400
    
    # Handle image/video URLs and amenities as JSON strings
    images_json = json.dumps(data.get('images', []))
    videos_json = json.dumps(data.get('videoUrls', []))
    amenities_json = json.dumps(data.get('amenities', []))

    new_property = Property(
        title=data['title'],
        description=data['description'],
        property_type=data['propertyType'],
        price=data['price'],
        units=data.get('units'),
        bedrooms=data.get('bedrooms'),
        bathrooms=data.get('bathrooms'),
        furnishing=data.get('furnishing'),
        possession=data.get('possession'),
        built_year=data.get('builtYear'),
        locality=data['locality'],
        city=data['city'],
        lat=data.get('lat'),
        lng=data.get('lng'),
        images=images_json,
        videos=videos_json,
        amenities=amenities_json,
        submitted_by_broker_id=submitted_by_broker_id,
        published=False, # New properties are typically pending review
        active=True,
        popular=False,
        views=0
    )
    db.session.add(new_property)
    db.session.commit()

    return jsonify(new_property.to_dict()), 201

# Add routes for updating and deleting properties (admin/broker specific)
# These will be similar to add_property but with PUT/DELETE methods