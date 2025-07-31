import os

class Config:
    """Base configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a_fallback_secret_key_if_not_set'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'a_fallback_jwt_secret_key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False # Suppresses a warning
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///default.db'

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    FLASK_ENV = 'development'
    # DATABASE_URL is taken from .env or default in Config

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    FLASK_ENV = 'production'
    # Ensure DATABASE_URL is set securely in production environment variables
