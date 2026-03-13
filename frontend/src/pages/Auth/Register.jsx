import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Box, Typography, Paper, Alert, IconButton, InputAdornment, LinearProgress, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { School, Visibility, VisibilityOff, Lock, Email, PersonAdd } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';

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

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setError('');
        const result = await googleLogin(credentialResponse.credential, role);
        setLoading(false);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Google sign-up failed');
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
                style={{ width: '100%', maxWidth: 450 }}
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
                    className="glass-panel"
                >
                    {loading && (
                        <LinearProgress
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 4,
                                backgroundColor: 'rgba(236, 72, 153, 0.2)',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#ec4899'
                                }
                            }}
                        />
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                        <motion.div
                            initial={{ rotate: -180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                        >
                            <Box sx={{
                                width: 72,
                                height: 72,
                                borderRadius: '50%',
                                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                                boxShadow: 'inset 0 0 20px rgba(236, 72, 153, 0.2)'
                            }}>
                                <PersonAdd sx={{ fontSize: 36, color: 'secondary.main' }} />
                            </Box>
                        </motion.div>

                        <Typography variant="h4" gutterBottom>Create Account</Typography>
                        <Typography variant="body1" color="text.secondary">
                            Join the IT Placement Engine
                        </Typography>
                    </Box>

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
                                error={confirmPassword.length > 0 && password !== confirmPassword}
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

                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                variant="outlined"
                                error={confirmPassword.length > 0 && password !== confirmPassword}
                                helperText={confirmPassword.length > 0 && password !== confirmPassword ? 'Passwords do not match' : ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: confirmPassword.length > 0 && password !== confirmPassword ? 'error.main' : 'text.secondary' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="role-select-label">Account Type</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    label="Account Type"
                                    sx={{
                                        borderRadius: 3,
                                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                                    }}
                                >
                                    <MenuItem value="student">Student/Candidate</MenuItem>
                                    <MenuItem value="company">Partner Company</MenuItem>
                                    <MenuItem value="admin">Administrator</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                fullWidth
                                size="large"
                                disabled={loading}
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    letterSpacing: '0.02em',
                                    background: 'linear-gradient(45deg, #ec4899 30%, #f472b6 90%)',
                                    boxShadow: '0 3px 15px 2px rgba(236, 72, 153, .3)',
                                }}
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </Button>

                            <Box sx={{ mt: 2, mb: 1 }}>
                                <Divider sx={{ '&::before, &::after': { borderColor: 'rgba(255,255,255,0.1)' } }}>
                                    <Typography variant="body2" color="text.secondary">Or sign up with</Typography>
                                </Divider>
                            </Box>

                            <Box display="flex" justifyContent="center">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => setError('Google Sign-Up failed')}
                                    useOneTap
                                    theme="filled_black"
                                    shape="pill"
                                />
                            </Box>

                            <Box sx={{ textAlign: 'center', mt: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Already have an account?{' '}
                                    <Box
                                        component={RouterLink}
                                        to="/login"
                                        sx={{
                                            color: 'primary.light',
                                            textDecoration: 'none',
                                            fontWeight: 600,
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                    >
                                        Sign in here
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
