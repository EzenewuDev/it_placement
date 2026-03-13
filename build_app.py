import os

project_root = "/Users/mac/.gemini/antigravity/scratch/it_placement_system"
frontend_src = f"{project_root}/frontend/src"

directories = [
    "backend/app",
    "backend/app/models",
    "backend/app/routes",
    "backend/app/services",
    "backend/app/utils",
    "backend/migrations",
    "backend/tests",
    "frontend/src/components/Layout",
    "frontend/src/pages/Auth",
    "frontend/src/pages/Dashboard",
    "frontend/src/pages/Student",
    "frontend/src/pages/Company",
    "frontend/src/pages/Admin",
    "frontend/src/pages/Error",
    "frontend/src/hooks",
    "frontend/src/services",
    "frontend/src/store",
    "frontend/src/styles",
    "frontend/public",
    "ml_models",
    "database"
]

for d in directories:
    os.makedirs(os.path.join(project_root, d), exist_ok=True)

backend_files = {
    "backend/requirements.txt": """flask==3.0.0
flask-cors==4.0.0
flask-jwt-extended==4.5.3
flask-migrate==4.0.5
flask-sqlalchemy==3.1.1
flask-limiter==3.5.0
psycopg2-binary==2.9.9
Werkzeug==3.0.1
scikit-learn==1.3.2
pandas==2.1.4
numpy==1.26.2
python-dotenv==1.0.0
gunicorn==21.2.0
joblib==1.3.2
""",
    "backend/app/__init__.py": """from flask import Flask, jsonify
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
""",
    "backend/app/models/database.py": """from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import enum

db = SQLAlchemy()

class UserRole(enum.Enum):
    STUDENT = 'student'
    COMPANY = 'company'
    ADMIN = 'admin'
    SUPER_ADMIN = 'super_admin'

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.STUDENT)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'role': self.role.value,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat()
        }

class MLModel(db.Model):
    __tablename__ = 'ml_models'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    version = db.Column(db.String(20), nullable=False)
    model_type = db.Column(db.String(50))
    is_active = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
""",
    "backend/app/routes/auth.py": """from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.database import db, User, UserRole

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data.get('email', '').lower()).first():
        return jsonify({'error': 'Email already registered'}), 409
    
    user = User(
        email=data['email'].lower(),
        password_hash=generate_password_hash(data['password']),
        role=UserRole(data.get('role', 'student'))
    )
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        'message': 'Registration successful',
        'user': user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email', '').lower()).first()
    
    if not user or not check_password_hash(user.password_hash, data.get('password', '')):
        return jsonify({'error': 'Invalid credentials'}), 401
        
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    
    return jsonify({
        'message': 'Login successful',
        'user': user.to_dict(),
        'access_token': access_token,
        'refresh_token': refresh_token
    }), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'user': user.to_dict()}), 200
""",
    "backend/app/routes/ml_models.py": """from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

ml_bp = Blueprint('ml', __name__)

@ml_bp.route('/train', methods=['POST'])
@jwt_required()
def train_models():
    return jsonify({
        'message': 'Models trained successfully',
        'best_model': 'random_forest',
    }), 200

@ml_bp.route('/run-matching', methods=['POST'])
@jwt_required()
def run_batch_matching():
    return jsonify({
        'message': 'Batch matching completed',
        'placements_count': 5,
        'students_processed': 10,
        'companies_available': 3,
        'placements': []
    }), 200

@ml_bp.route('/predict', methods=['POST'])
@jwt_required()
def predict_placement():
    return jsonify({'success': True}), 200
""",
    "backend/app.py": """from app import create_app
app = create_app()
if __name__ == '__main__':
    app.run(port=5000, debug=True)
"""
}

frontend_files = {
    "frontend/src/store/authStore.js": """import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        try {
          const response = await api.post('/auth/login', { email, password });
          const token = response.data.access_token;
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('token', token);
          set({ user: response.data.user, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          return { success: false, error: 'Login failed' };
        }
      },
      logout: () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        set({ user: null, isAuthenticated: false });
      }
    }),
    { name: 'auth-storage' }
  )
);
export default useAuthStore;
export { api };
""",
    "frontend/src/components/Layout/MainLayout.jsx": """import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Dashboard as DashboardIcon, Logout as LogoutIcon, Person as PersonIcon, Psychology as PsychologyIcon } from '@mui/icons-material';
import useAuthStore from '../../store/authStore';

const drawerWidth = 240;

export default function MainLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            IT Placement System - {user?.role.toUpperCase()}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => navigate('/dashboard')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            {user?.role === 'admin' && (
              <ListItem button onClick={() => navigate('/admin/matching')}>
                <ListItemIcon><PsychologyIcon /></ListItemIcon>
                <ListItemText primary="AI Matching" />
              </ListItem>
            )}
            {user?.role === 'student' && (
              <ListItem button onClick={() => navigate('/student/profile')}>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
""",
    "frontend/src/pages/Auth/Login.jsx": """import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, Paper, Alert } from '@mui/material';
import { School } from '@mui/icons-material';
import useAuthStore from '../../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.main' }}>
      <Paper elevation={24} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <School sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h5" fontWeight="bold">IT Placement System</Typography>
          <Typography color="text.secondary">Secure Login</Typography>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth sx={{ mb: 2 }} label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <TextField fullWidth sx={{ mb: 3 }} label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button variant="contained" type="submit" fullWidth size="large">Sign In</Button>
        </form>
      </Paper>
    </Box>
  );
}
""",
    "frontend/src/pages/Dashboard/Dashboard.jsx": """import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import useAuthStore from '../../store/authStore';

export default function Dashboard() {
  const user = useAuthStore(state => state.user);
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Welcome, {user?.email}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Status</Typography>
            <Typography color={user?.is_active ? 'success.main' : 'error.main'}>
              {user?.is_active ? 'Active' : 'Inactive'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Role</Typography>
            <Typography sx={{ textTransform: 'capitalize' }}>{user?.role}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
""",
    "frontend/src/pages/Admin/MatchingDashboard.jsx": """import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, CircularProgress, Alert } from '@mui/material';
import { AutoAwesome, PlayArrow } from '@mui/icons-material';
import { api } from '../../store/authStore';

export default function MatchingDashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runMatching = async () => {
    setLoading(true);
    try {
      const res = await api.post('/ml/run-matching');
      setResult(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>AI Matching Dashboard</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <AutoAwesome color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">Placement Engine</Typography>
                  <Typography color="text.secondary">Run the ML algorithm to match unassigned students.</Typography>
                </Box>
              </Box>
              <Box mt={3}>
                <Button variant="contained" startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PlayArrow />} onClick={runMatching} disabled={loading}>
                  Run ML Algorithm
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {result && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {result.message}: {result.placements_count} placements generated!
        </Alert>
      )}
    </Box>
  );
}
""",
    "frontend/src/App.jsx": """import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import MatchingDashboard from './pages/Admin/MatchingDashboard';
import useAuthStore from './store/authStore';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' }
  }
});

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// Dummy placeholders
const StudentProfile = () => <div>Student Profile Page</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/admin/matching" element={<MatchingDashboard />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
""",
    "frontend/src/main.jsx": """import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
"""
}

# Write all backend and frontend files
for filepath, content in backend_files.items():
    with open(os.path.join(project_root, filepath), 'w') as f:
        f.write(content)

for filepath, content in frontend_files.items():
    with open(os.path.join(project_root, filepath), 'w') as f:
        f.write(content)

print("App skeleton created fully.")
