from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
try:
    id_token.verify_oauth2_token("fake", google_requests.Request())
except Exception as e:
    print("EXCEPTION:", repr(e))
