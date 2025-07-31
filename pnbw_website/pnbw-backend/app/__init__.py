import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize extensions outside the create_app function
# They will be initialized with the app context later
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_class=None):
    """
    Factory function to create and configure the Flask application.
    """
    app = Flask(__name__)

    # Load configuration
    if config_class is None:
        env = os.environ.get('FLASK_ENV', 'development')
        if env == 'production':
            from config import ProductionConfig
            app.config.from_object(ProductionConfig)
        else:
            from config import DevelopmentConfig
            app.config.from_object(DevelopmentConfig)
    else:
        app.config.from_object(config_class)

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Import models so Flask-Migrate can detect them
    from app import models

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.properties import properties_bp
    from app.routes.brokers import brokers_bp
    from app.routes.enquiries import enquiries_bp
    from app.routes.admin import admin_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(properties_bp, url_prefix='/api/properties')
    app.register_blueprint(brokers_bp, url_prefix='/api/brokers')
    app.register_blueprint(enquiries_bp, url_prefix='/api/enquiries')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    # JWT custom error handlers (optional, but good practice)
    @jwt.unauthorized_loader
    def unauthorized_response(callback):
        return {'message': 'Missing Authorization Header'}, 401

    @jwt.invalid_token_loader
    def invalid_token_response(callback):
        return {'message': 'Signature verification failed'}, 401

    @jwt.expired_token_loader
    def expired_token_response(callback):
        return {'message': 'Token has expired'}, 401

    return app
