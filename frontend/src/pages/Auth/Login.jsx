import React, { useState } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { Button, TextField, Box, Typography, Paper, Alert, IconButton, InputAdornment, LinearProgress, Divider, Grid } from '@mui/material';
import { School, Visibility, VisibilityOff, Lock, Email, Apple, Google } from '@mui/icons-material';
import { useGoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import SlidePanel from './SlidePanel';

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
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Failed to login');
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    setLoading(true);
    setError('');
    const result = await googleLogin(tokenResponse.access_token);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Google login failed');
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError('Google Sign-In failed'),
    prompt: 'select_account'
  });

  return (
    <Grid container sx={{ minHeight: '100vh', backgroundColor: "background.default" }}>
      {/* Left side: Presentation Panel */}
      <Grid item xs={12} md={6} lg={5} sx={{ display: { xs: 'none', md: 'block' } }}>
        <SlidePanel />
      </Grid>

      {/* Right side: Login Form */}
      <Grid item xs={12} md={6} lg={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* Subtle background decoration on the right side */}
        <Box sx={{
          position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 0
        }} />

        <Box sx={{
          width: '100%',
          maxWidth: 480,
          p: { xs: 3, sm: 5 },
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.175, 0.885, 0.32, 1.275] }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, sm: 5 },
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                bgcolor: "background.paper",
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(128,128,128,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              {loading && (
                <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: 'rgba(99, 102, 241, 0.2)', '& .MuiLinearProgress-bar': { backgroundColor: '#6366f1' } }} />
              )}

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}>
                  <Box sx={{
                    width: 72, height: 72, borderRadius: '50%', backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
                    boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', border: '1px solid rgba(99,102,241,0.3)'
                  }}>
                    <School sx={{ fontSize: 36, color: '#818cf8' }} />
                  </Box>
                </motion.div>

                <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.5, mb: 1 }}>Welcome Back</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  IT Placement System Portal
                </Typography>
              </Box>

              {successMessage && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <Alert severity="success" sx={{ mb: 3, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    {successMessage}
                  </Alert>
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    {error}
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <TextField
                    fullWidth label="Email Address" type="email" value={email}
                    onChange={e => setEmail(e.target.value)} required variant="outlined"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.secondary' }} /></InputAdornment>,
                    }}
                  />

                  <TextField
                    fullWidth label="Password" type={showPassword ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} required variant="outlined"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'text.secondary' }} /></InputAdornment>,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />

                  <Button
                    variant="contained" type="submit" fullWidth size="large" disabled={loading}
                    sx={{
                      mt: 1, py: 1.6, fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.02em', borderRadius: 3,
                      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                      boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)',
                      '&:hover': { background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)', boxShadow: '0 6px 20px rgba(79, 70, 229, 0.5)' }
                    }}
                  >
                    {loading ? 'Authenticating...' : 'Sign In'}
                  </Button>

                  <Box sx={{ mt: 1, mb: 1 }}>
                    <Divider sx={{ '&::before, &::after': { borderColor: 'rgba(128,128,128,0.15)' } }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>Or sign in with</Typography>
                    </Divider>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Google />}
                        onClick={() => loginWithGoogle()}
                        sx={{
                          borderRadius: 50,
                          textTransform: 'none',
                          color: 'text.primary',
                          borderColor: 'rgba(128,128,128,0.3)',
                          py: 1,
                          fontSize: '1rem',
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: 'rgba(128,128,128,0.5)',
                            bgcolor: 'rgba(128,128,128,0.1)'
                          }
                        }}
                      >
                        Google
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Apple />}
                        sx={{
                          borderRadius: 50,
                          textTransform: 'none',
                          color: 'text.primary',
                          borderColor: 'rgba(128,128,128,0.3)',
                          py: 1,
                          fontSize: '1rem',
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: 'rgba(128,128,128,0.5)',
                            bgcolor: 'rgba(128,128,128,0.1)'
                          }
                        }}
                        onClick={() => setError('Apple Sign In is currently under construction for the defense.')}
                      >
                        Apple
                      </Button>
                    </Grid>
                  </Grid>

                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
                      Don't have an account?{' '}
                      <Box component={RouterLink} to="/register" sx={{ color: '#818cf8', textDecoration: 'none', fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}>
                        Sign up now
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </form>
            </Paper>
          </motion.div>
        </Box>
      </Grid>
    </Grid>
  );
}
