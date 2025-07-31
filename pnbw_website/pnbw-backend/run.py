import os
from app import create_app, db
from flask.cli import with_appcontext
import click
from app.models import User, Broker, Property, Enquiry # Import models for CLI commands
from werkzeug.security import generate_password_hash

app = create_app()

# CLI commands for database management and initial setup
@app.cli.command('init-db')
def init_db_command():
    """Clear existing data and create new tables."""
    db.drop_all()
    db.create_all()
    click.echo('Initialized the database.')

@app.cli.command('create-admin')
@with_appcontext
def create_admin_command():
    """Create an initial admin user."""
    admin_email = os.environ.get('ADMIN_EMAIL')
    admin_password = os.environ.get('ADMIN_PASSWORD')

    if not admin_email or not admin_password:
        click.echo("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env")
        return

    if User.query.filter_by(email=admin_email).first():
        click.echo("Admin user already exists.")
        return

    admin_user = User(username='admin', email=admin_email, role='admin')
    admin_user.set_password(admin_password)
    db.session.add(admin_user)
    db.session.commit()
    click.echo(f"Admin user '{admin_user.username}' created successfully.")

@app.cli.command('seed-data')
@with_appcontext
def seed_data_command():
    """Seed initial mock data into the database."""
    from data.frontend import sites as mock_sites # Import mock data from frontend.js
    import json

    if Property.query.first():
        click.echo("Database already contains properties. Skipping seeding.")
        return

    # Create a dummy broker if none exists, to assign properties
    dummy_broker = Broker.query.first()
    if not dummy_broker:
        dummy_broker_user = User(username='mockbroker', email='mockbroker@example.com', phone='1234567890', role='broker') # Added phone
        dummy_broker_user.set_password('password')
        db.session.add(dummy_broker_user)
        db.session.commit() # Commit to get user.id
        
        dummy_broker = Broker(
            user_id=dummy_broker_user.id,
            name='Mock Broker',
            email='mockbroker@example.com',
            phone='1234567890',
            referral_code='MOCK-001'
        )
        db.session.add(dummy_broker)
        db.session.commit()
        click.echo("Created a dummy broker for seeding.")

    for site_data in mock_sites:
        # Ensure ID is not set manually if it's auto-incremented
        # Remove 'id' from site_data if your DB generates it
        # For simplicity, we'll let DB assign ID and ignore mock ID
        
        # Convert lists to JSON strings for DB storage
        images_json = json.dumps(site_data.get('images', []))
        videos_json = json.dumps(site_data.get('videos', [])) # Assuming videos might be in mock data
        amenities_json = json.dumps(site_data.get('amenities', [])) # Assuming amenities might be in mock data

        prop = Property(
            title=site_data['title'],
            description=site_data.get('description', 'No description provided.'),
            property_type=site_data.get('propertyType', 'Apartment'),
            price=site_data['price'],
            units=site_data.get('units'),
            bedrooms=site_data.get('bedrooms'),
            bathrooms=site_data.get('bathrooms'),
            furnishing=site_data.get('furnishing'),
            possession=site_data.get('possession'),
            built_year=site_data.get('builtYear'),
            locality=site_data['locality'],
            city=site_data['city'],
            lat=site_data.get('lat'),
            lng=site_data.get('lng'),
            images=images_json,
            videos=videos_json,
            amenities=amenities_json,
            published=True, # Seeded data is published by default
            active=True,
            popular=site_data.get('popular', False),
            views=site_data.get('views', 0),
            submitted_by_broker_id=dummy_broker.id # Assign to dummy broker
        )
        db.session.add(prop)
    db.session.commit()
    click.echo(f"Seeded {len(mock_sites)} properties.")

    # Seed dummy enquiries
    if Enquiry.query.first():
        click.echo("Database already contains enquiries. Skipping seeding.")
        return

    dummy_user = User.query.filter_by(username='testuser').first()
    if not dummy_user:
        dummy_user = User(username='testuser', email='test@example.com', phone='1112223333')
        dummy_user.set_password('password')
        db.session.add(dummy_user)
        db.session.commit()
        click.echo("Created a dummy user for seeding enquiries.")

    seeded_properties = Property.query.limit(3).all() # Get a few properties to link enquiries to
    if seeded_properties:
        enq1 = Enquiry(user_id=dummy_user.id, property_id=seeded_properties[0].id, message="I'm interested in this property! Please call me.")
        enq2 = Enquiry(user_id=dummy_user.id, property_id=seeded_properties[1].id, message="Can I get more details about the amenities?")
        db.session.add_all([enq1, enq2])
        db.session.commit()
        click.echo("Seeded dummy enquiries.")
    else:
        click.echo("No properties found to link enquiries to. Skipping enquiry seeding.")

if __name__ == '__main__':
    app.run()
