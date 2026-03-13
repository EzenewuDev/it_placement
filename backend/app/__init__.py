from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
from datetime import timedelta

jwt = JWTManager()
migrate = Migrate()
limiter = Limiter(key_func=get_remote_address)

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'dev-secret-key'
    # Use SQLite for simplicity since this is an MVP without a Postgres pod running trivially
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/it_placement_db.sqlite'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
    
    from app.models.database import db
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)
    
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    from app.routes.auth import auth_bp
    from app.routes.ml_models import ml_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(ml_bp, url_prefix='/api/ml')
    
    with app.app_context():
        db.create_all()
    return app
