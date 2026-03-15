import os
import traceback
import requests as http_requests
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from jose import jwt as jose_jwt
from app.models.database import db, User, UserRole

auth_bp = Blueprint('auth', __name__)

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', '411236171448-7g6uiuiusu4m0c7hg1mij1cfl21qlsme.apps.googleusercontent.com')

# ─── Helper: fetch Google's public JWK keys ───────────────────────────────────
_google_certs_cache = None

def get_google_public_keys():
    global _google_certs_cache
    try:
        r = http_requests.get('https://www.googleapis.com/oauth2/v3/certs', timeout=5)
        _google_certs_cache = r.json()
    except Exception:
        pass  # use cached if network fails
    return _google_certs_cache


# ─── Register ─────────────────────────────────────────────────────────────────
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    role_str = data.get('role', 'student')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409

    try:
        role = UserRole(role_str)
    except ValueError:
        role = UserRole.STUDENT

    user = User(
        email=email,
        password_hash=generate_password_hash(password, method='pbkdf2:sha256'),
        role=role
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({
        'message': 'Registration successful',
        'user': user.to_dict()
    }), 201


# ─── Login ────────────────────────────────────────────────────────────────────
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))

    return jsonify({
        'message': 'Login successful',
        'user': user.to_dict(),
        'access_token': access_token,
        'refresh_token': refresh_token
    }), 200


# ─── Get Current User ─────────────────────────────────────────────────────────
@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'user': user.to_dict()}), 200


# ─── Google OAuth ─────────────────────────────────────────────────────────────
@auth_bp.route('/google', methods=['POST'])
def google_auth():
    data = request.get_json()
    token = data.get('credential', '').strip()
    role_str = data.get('role', 'student')

    if not token:
        return jsonify({'error': 'Token is missing'}), 400

    email = None

    # Method 1: Verify using Google's JWK public keys (jose – no OpenSSL needed)
    try:
        keys = get_google_public_keys()
        if keys:
            unverified_header = jose_jwt.get_unverified_header(token)
            # Find the matching key by kid
            matching_key = None
            for k in keys.get('keys', []):
                if k.get('kid') == unverified_header.get('kid'):
                    matching_key = k
                    break
            if matching_key:
                payload = jose_jwt.decode(
                    token,
                    matching_key,
                    algorithms=['RS256'],
                    audience=GOOGLE_CLIENT_ID
                )
                email = payload.get('email', '').lower()
    except Exception as e1:
        print(f"[GoogleAuth] JWK verification failed: {e1}")

    # Method 2: Fallback – call Google tokeninfo endpoint
    if not email:
        try:
            resp = http_requests.get(
                f'https://oauth2.googleapis.com/tokeninfo?id_token={token}',
                timeout=10
            )
            if resp.status_code == 200:
                info = resp.json()
                aud = info.get('aud', '')
                if GOOGLE_CLIENT_ID in aud or aud == GOOGLE_CLIENT_ID:
                    email = info.get('email', '').lower()
        except Exception as e2:
            print(f"[GoogleAuth] tokeninfo fallback failed: {e2}")

    # Method 3: Try as access_token (if useGoogleLogin implicit flow is used)
    if not email:
        try:
            resp = http_requests.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                headers={'Authorization': f'Bearer {token}'},
                timeout=10
            )
            if resp.status_code == 200:
                info = resp.json()
                email = info.get('email', '').lower()
        except Exception as e3:
            print(f"[GoogleAuth] userinfo fallback failed: {e3}")

    if not email:
        return jsonify({'error': 'Could not verify Google token. Please try again.'}), 401

    # Find or create user
    try:
        role = UserRole(role_str)
    except ValueError:
        role = UserRole.STUDENT

    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(
            email=email,
            password_hash=generate_password_hash(os.urandom(24).hex(), method='pbkdf2:sha256'),
            role=role
        )
        db.session.add(user)
        db.session.commit()

    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))

    return jsonify({
        'message': 'Google authentication successful',
        'user': user.to_dict(),
        'access_token': access_token,
        'refresh_token': refresh_token
    }), 200
