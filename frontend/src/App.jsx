import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';

import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import SplashScreen from './pages/Auth/SplashScreen';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminOverview from './pages/Admin/AdminOverview';
import MatchingDashboard from './pages/Admin/MatchingDashboard';
import StudentProfile from './pages/Student/StudentProfile';
import GeoMatchStatus from './pages/Student/GeoMatchStatus';
import StudentPayment from './pages/Student/StudentPayment';
import CompanyProfile from './pages/Company/CompanyProfile';
import CompanyPayment from './pages/Company/CompanyPayment';
import SupervisorDashboard from './pages/Admin/SupervisorDashboard';
import useAuthStore from './store/authStore';

import useThemeStore from './store/themeStore';

const getTheme = (mode) => createTheme({
  typography: {
    fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h3: { fontWeight: 700, letterSpacing: '-0.02em', color: mode === 'dark' ? '#fff' : '#0f172a' },
    h4: { fontWeight: 700, letterSpacing: '-0.02em', color: mode === 'dark' ? '#fff' : '#0f172a' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em', color: mode === 'dark' ? '#f8fafc' : '#1e293b' },
    h6: { fontWeight: 600, color: mode === 'dark' ? '#f8fafc' : '#1e293b' },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  palette: {
    mode,
    primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
    secondary: { main: '#ec4899', light: '#f472b6', dark: '#db2777' },
    background: {
      default: mode === 'dark' ? '#0f172a' : '#f8fafc',
      paper: mode === 'dark' ? 'rgba(17, 25, 40, 0.65)' : 'rgba(255, 255, 255, 0.9)'
    },
    text: {
      primary: mode === 'dark' ? '#f8fafc' : '#0f172a',
      secondary: mode === 'dark' ? '#94a3b8' : '#64748b'
    }
  },
  shape: { borderRadius: 16 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(16px)',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: mode === 'dark' ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : '0 8px 32px 0 rgba(0, 0, 0, 0.05)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 20px -6px rgba(99, 102, 241, 0.6)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
            transition: 'all 0.2s',
            '& fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            '&:hover fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6366f1'
            }
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRight: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: 'none'
        }
      }
    }
  }
});

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// Show splash on mobile/tablet, go straight to login on desktop
const SmartRoot = () => {
  const isMobile = window.innerWidth < 1024;
  return isMobile ? <SplashScreen /> : <Navigate to="/login" replace />;
};

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function App() {
  const refreshUser = useAuthStore(state => state.refreshUser);
  const mode = useThemeStore(state => state.mode);

  useEffect(() => {
    // On app startup, validate the stored JWT and refresh user state
    refreshUser();
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/geomatch" element={<GeoMatchStatus />} />
              <Route path="/student/payment" element={<StudentPayment />} />
              <Route path="/company/profile" element={<CompanyProfile />} />
              <Route path="/company/payment" element={<CompanyPayment />} />
              <Route path="/admin/overview" element={<AdminOverview />} />
              <Route path="/admin/supervisor" element={<SupervisorDashboard />} />
              <Route path="/admin/matching" element={<MatchingDashboard />} />
            </Route>

            <Route path="/" element={<SmartRoot />} />
            <Route path="/splash" element={<SplashScreen />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
