import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import MatchingDashboard from './pages/Admin/MatchingDashboard';
import StudentProfile from './pages/Student/StudentProfile';
import CompanyProfile from './pages/Company/CompanyProfile';
import useAuthStore from './store/authStore';

const theme = createTheme({
  typography: {
    fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h3: { fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' },
    h4: { fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em', color: '#f8fafc' },
    h6: { fontWeight: 600, color: '#f8fafc' },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5'
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777'
    },
    background: {
      default: 'transparent',
      paper: 'rgba(17, 25, 40, 0.65)'
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8'
    }
  },
  shape: { borderRadius: 16 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
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
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            transition: 'all 0.2s',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)'
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)'
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
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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

import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function App() {
  const refreshUser = useAuthStore(state => state.refreshUser);

  useEffect(() => {
    // On app startup, validate the stored JWT and refresh user state
    refreshUser();
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/company/profile" element={<CompanyProfile />} />
              <Route path="/admin/matching" element={<MatchingDashboard />} />
            </Route>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
