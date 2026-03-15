import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Box, Typography, Paper, Alert, IconButton, InputAdornment, LinearProgress, FormControl, InputLabel, Select, MenuItem, Divider, Grid } from '@mui/material';
import { School, Visibility, VisibilityOff, Lock, Email, PersonAdd, Apple, Google } from '@mui/icons-material';
import { useGoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import SlidePanel from './SlidePanel';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const register = useAuthStore(state => state.register);
  const googleLogin = useAuthStore(state => state.googleLogin);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!email.includes('@')) {
      return setError('Please enter a valid email address.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match. Please check and try again.');
    }

    setLoading(true);
    const result = await Promise.all([
      register(email, password, role),
      new Promise(resolve => setTimeout(resolve, 600))
    ]).then(res => res[0]);
    setLoading(false);

    if (result.success) {
      navigate('/login', { state: { message: 'Account created successfully! Please sign in.' } });
    } else {
      setError(result.error || 'Failed to register');
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    setLoading(true);
    setError('');
    const result = await googleLogin(tokenResponse.access_token, role);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Google sign-up failed');
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError('Google Sign-Up failed'),
    prompt: 'select_account'
  });

  return (
    <Grid container sx={{ minHeight: '100vh', backgroundColor: "background.default" }}>
      {/* Left side: Presentation Panel */}
      <Grid item xs={12} md={6} lg={5} sx={{ display: { xs: 'none', md: 'block' } }}>
        <SlidePanel />
      </Grid>

      {/* Right side: Register Form */}
      <Grid item xs={12} md={6} lg={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* Subtle background decoration */}
        <Box sx={{
          position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 0
        }} />

        <Box sx={{
          width: '100%',
          maxWidth: 480,
          p: { xs: 3, sm: 5 },
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
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
                <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: 'rgba(236, 72, 153, 0.2)', '& .MuiLinearProgress-bar': { backgroundColor: '#ec4899' } }} />
              )}

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <motion.div initial={{ rotate: -180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}>
                  <Box sx={{
                    width: 72, height: 72, borderRadius: '50%', backgroundColor: 'rgba(236, 72, 153, 0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
                    boxShadow: '0 4px 14px 0 rgba(236, 72, 153, 0.39)', border: '1px solid rgba(236,72,153,0.3)'
                  }}>
                    <PersonAdd sx={{ fontSize: 36, color: '#f472b6' }} />
                  </Box>
                </motion.div>

                <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.5, mb: 1 }}>Create Account</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Join the IT Placement Engine
                </Typography>
              </Box>

              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    {error}
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
                  <TextField
                    fullWidth label="Email Address" type="email" value={email}
                    onChange={e => setEmail(e.target.value)} required variant="outlined" size="small"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.secondary' }} /></InputAdornment>,
                    }}
                  />

                  <TextField
                    fullWidth label="Password" type={showPassword ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} required variant="outlined" size="small"
                    error={confirmPassword.length > 0 && password !== confirmPassword}
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

                  <TextField
                    fullWidth label="Confirm Password" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} required variant="outlined" size="small"
                    error={confirmPassword.length > 0 && password !== confirmPassword}
                    helperText={confirmPassword.length > 0 && password !== confirmPassword ? 'Passwords do not match' : ''}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Lock sx={{ color: confirmPassword.length > 0 && password !== confirmPassword ? 'error.main' : 'text.secondary' }} /></InputAdornment>,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />

                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="role-select-label">Account Type</InputLabel>
                    <Select
                      labelId="role-select-label" value={role} onChange={(e) => setRole(e.target.value)} label="Account Type"
                      sx={{ borderRadius: 2, bgcolor: 'rgba(128,128,128,0.05)' }}
                    >
                      <MenuItem value="student">Student/Candidate</MenuItem>
                      <MenuItem value="company">Partner Company</MenuItem>
                      <MenuItem value="admin">Administrator</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained" type="submit" fullWidth size="large" disabled={loading}
                    sx={{
                      mt: 1, py: 1.4, fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.02em', borderRadius: 3,
                      background: 'linear-gradient(135deg, #be185d 0%, #db2777 100%)',
                      boxShadow: '0 4px 14px 0 rgba(219, 39, 119, 0.39)',
                      '&:hover': { background: 'linear-gradient(135deg, #9d174d 0%, #be185d 100%)', boxShadow: '0 6px 20px rgba(219, 39, 119, 0.5)' }
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>

                  <Box sx={{ mt: 1, mb: 0 }}>
                    <Divider sx={{ '&::before, &::after': { borderColor: 'rgba(128,128,128,0.15)' } }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>Or sign up with</Typography>
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
                        onClick={() => setError('Apple Sign Up is currently under construction for the defense.')}
                      >
                        Apple
                      </Button>
                    </Grid>
                  </Grid>

                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
                      Already have an account?{' '}
                      <Box component={RouterLink} to="/login" sx={{ color: '#f472b6', textDecoration: 'none', fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}>
                        Sign in here
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
