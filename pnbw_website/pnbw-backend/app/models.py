from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='user', nullable=False) # 'user', 'broker', 'admin'
    phone = db.Column(db.String(20)) # Added phone number
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    enquiries_made = db.relationship('Enquiry', backref='user', lazy=True, foreign_keys='Enquiry.user_id')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'phone': self.phone,
            'created_at': self.created_at.isoformat() + 'Z'
        }

    def __repr__(self):
        return f'<User {self.username}>'

class Broker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=True) # Link to User table
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False) # Added phone number
    experience_years = db.Column(db.Integer, default=0)
    operating_locations = db.Column(db.Text) # Stored as comma-separated string or JSON string
    active = db.Column(db.Boolean, default=True)
    referral_code = db.Column(db.String(32), unique=True)
    total_referrals = db.Column(db.Integer, default=0)
    profit_earned = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    listings = db.relationship('Property', backref='broker', lazy=True, foreign_keys='Property.submitted_by_broker_id')
    enquiries_received = db.relationship('Enquiry', backref='broker_assigned', lazy=True, foreign_keys='Enquiry.assigned_broker_id')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'experience_years': self.experience_years,
            'operating_locations': self.operating_locations,
            'active': self.active,
            'referral_code': self.referral_code,
            'total_referrals': self.total_referrals,
            'profit_earned': self.profit_earned,
            'created_at': self.created_at.isoformat() + 'Z'
        }

    def __repr__(self):
        return f'<Broker {self.name}>'

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    property_type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    units = db.Column(db.Float) # Area in Sq. Ft. or Units
    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    furnishing = db.Column(db.String(50)) # Unfurnished, Semi-Furnished, Furnished
    possession = db.Column(db.String(50)) # Immediate, Under Construction, etc.
    built_year = db.Column(db.Integer)
    locality = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    images = db.Column(db.Text) # Stored as JSON string of URLs
    videos = db.Column(db.Text) # Stored as JSON string of URLs
    amenities = db.Column(db.Text) # Stored as JSON string of amenities
    published = db.Column(db.Boolean, default=False) # True if published to public site
    active = db.Column(db.Boolean, default=True) # True if available, False if sold/inactive
    popular = db.Column(db.Boolean, default=False) # True if featured on homepage
    views = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Foreign key to Broker who submitted it
    submitted_by_broker_id = db.Column(db.Integer, db.ForeignKey('broker.id'), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'propertyType': self.property_type,
            'price': self.price,
            'units': self.units,
            'bedrooms': self.bedrooms,
            'bathrooms': self.bathrooms,
            'furnishing': self.furnishing,
            'possession': self.possession,
            'builtYear': self.built_year,
            'locality': self.locality,
            'city': self.city,
            'lat': self.lat,
            'lng': self.lng,
            'images': json.loads(self.images) if self.images else [],
            'videos': json.loads(self.videos) if self.videos else [],
            'amenities': json.loads(self.amenities) if self.amenities else [],
            'published': self.published,
            'active': self.active,
            'popular': self.popular,
            'views': self.views,
            'createdAt': self.created_at.isoformat() + 'Z',
            'updatedAt': self.updated_at.isoformat() + 'Z',
            'submittedByBrokerId': self.submitted_by_broker_id,
            'submittedBy': self.broker.name if self.broker else None # Access broker name if relationship exists
        }

    def __repr__(self):
        return f'<Property {self.title}>'

class Enquiry(db.Model):
    _id = db.Column(db.Integer, primary_key=True) # Using _id to match frontend mock
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='pending') # 'pending', 'contacted', 'closed'
    assigned_broker_id = db.Column(db.Integer, db.ForeignKey('broker.id'), nullable=True) # Broker assigned to handle

    # Relationships
    user_details = db.relationship('User', backref='enquiries', lazy=True, foreign_keys='Enquiry.user_id')
    property_details = db.relationship('Property', backref='enquiries', lazy=True, foreign_keys='Enquiry.property_id')

    def to_dict(self):
        return {
            '_id': self._id,
            'userId': self.user_details.to_dict() if self.user_details else {'id': self.user_id, 'name': 'N/A', 'email': 'N/A', 'phone': 'N/A'}, # Include user details
            'propertyId': self.property_details.to_dict() if self.property_details else {'id': self.property_id, 'title': 'N/A'}, # Include property details
            'message': self.message,
            'createdAt': self.created_at.isoformat() + 'Z',
            'status': self.status,
            'assignedBrokerId': self.assigned_broker_id,
            'assignedBrokerName': self.broker_assigned.name if self.broker_assigned else None
        }

    def __repr__(self):
        return f'<Enquiry {self._id}>'