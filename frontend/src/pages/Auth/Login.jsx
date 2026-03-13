import React, { useState } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { Button, TextField, Box, Typography, Paper, Alert, IconButton, InputAdornment, LinearProgress, Divider } from '@mui/material';
import { School, Visibility, VisibilityOff, Lock, Email } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = useAuthStore(state => state.login);
  const googleLogin = useAuthStore(state => state.googleLogin);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate slight delay for animation if needed, but the actual login might be fast
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Failed to login');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    const result = await googleLogin(credentialResponse.credential);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Google login failed');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      p: 3
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.175, 0.885, 0.32, 1.275] }}
        style={{ width: '100%', maxWidth: 420 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 5 },
            width: '100%',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {loading && (
            <LinearProgress
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#6366f1'
                }
              }}
            />
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <Box sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                boxShadow: 'inset 0 0 20px rgba(99, 102, 241, 0.2)'
              }}>
                <School sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </motion.div>

            <Typography variant="h4" gutterBottom>Welcome Back</Typography>
            <Typography variant="body1" color="text.secondary">
              IT Placement System Portal
            </Typography>
          </Box>

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                {successMessage}
              </Alert>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  letterSpacing: '0.02em',
                  background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
                  boxShadow: '0 3px 15px 2px rgba(99, 102, 241, .3)',
                }}
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </Button>

              <Box sx={{ mt: 2, mb: 1 }}>
                <Divider sx={{ '&::before, &::after': { borderColor: 'rgba(255,255,255,0.1)' } }}>
                  <Typography variant="body2" color="text.secondary">Or sign in with</Typography>
                </Divider>
              </Box>

              <Box display="flex" justifyContent="center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google Sign-In failed')}
                  useOneTap
                  theme="filled_black"
                  shape="pill"
                />
              </Box>

              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Box
                    component={RouterLink}
                    to="/register"
                    sx={{
                      color: 'secondary.light',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Sign up now
                  </Box>
                </Typography>
              </Box>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
}
