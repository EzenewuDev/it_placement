import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Chip, Avatar, Divider } from '@mui/material';
import { Business, Label, AddCircleOutline } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';

export default function CompanyProfile() {
    const user = useAuthStore(state => state.user);
    const [requirements, setRequirements] = useState(['React', 'Node.js', 'Machine Learning']);
    const [newReq, setNewReq] = useState('');

    const addReq = (e) => {
        e.preventDefault();
        if (newReq.trim() && !requirements.includes(newReq.trim())) {
            setRequirements([...requirements, newReq.trim()]);
            setNewReq('');
        }
    };

    const removeReq = (req) => {
        setRequirements(requirements.filter(r => r !== req));
    };

    return (
        <Box>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <Typography variant="h4" fontWeight="700" gutterBottom>
                    Partner Company Portal
                </Typography>
                <Typography color="text.secondary" mb={4}>
                    Define your required technical stack to get the best AI-matched interns.
                </Typography>
            </motion.div>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                        <Paper sx={{ p: 4, height: '100%', textAlign: 'center', background: 'rgba(17, 25, 40, 0.75)' }}>
                            <Avatar
                                sx={{
                                    width: 100, height: 100, mx: 'auto', mb: 3,
                                    bgcolor: 'secondary.main',
                                    boxShadow: '0 0 30px rgba(236, 72, 153, 0.3)'
                                }}
                            >
                                <Business fontSize="large" />
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold">
                                TechCorp Inc.
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                                {user?.email}
                            </Typography>
                            <Chip label="Verified Partner" size="small" color="secondary" sx={{ mt: 1, fontWeight: 'bold' }} />

                            <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.05)' }} />

                            <Box textAlign="left">
                                <Typography variant="subtitle2" color="text.secondary" mb={2} textTransform="uppercase" letterSpacing={1}>
                                    Status Overview
                                </Typography>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography color="text.secondary">Open Positions</Typography>
                                    <Typography fontWeight="bold">12</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography color="text.secondary">Matches Received</Typography>
                                    <Typography fontWeight="bold" color="primary.main">34</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={8}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h6" display="flex" alignItems="center" gap={1} mb={3}>
                                <Label color="secondary" /> Ideal Candidate Requirements
                            </Typography>

                            <Box mb={4}>
                                <Typography variant="body2" color="text.secondary" mb={2}>
                                    Our AI engine uses Cosine Similarity against these exact requirements to find your perfect students.
                                </Typography>

                                <Box
                                    display="flex"
                                    flexWrap="wrap"
                                    gap={1.5}
                                    sx={{
                                        p: 3,
                                        border: '1px dashed rgba(236, 72, 153, 0.3)',
                                        borderRadius: 3,
                                        bgcolor: 'rgba(236, 72, 153, 0.05)',
                                        minHeight: 120
                                    }}
                                >
                                    <AnimatePresence>
                                        {requirements.map((req, index) => (
                                            <motion.div
                                                key={req}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                layout
                                            >
                                                <Chip
                                                    label={req}
                                                    onDelete={() => removeReq(req)}
                                                    color="secondary"
                                                    sx={{
                                                        fontSize: '0.9rem',
                                                        py: 2,
                                                        fontWeight: 600,
                                                        bgcolor: 'rgba(236, 72, 153, 0.2)',
                                                        color: '#f472b6',
                                                        border: '1px solid rgba(236, 72, 153, 0.4)'
                                                    }}
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {requirements.length === 0 && (
                                        <Typography color="text.secondary" sx={{ m: 'auto', fontStyle: 'italic' }}>
                                            No specific requirements defined.
                                        </Typography>
                                    )}
                                </Box>
                            </Box>

                            <form onSubmit={addReq}>
                                <Box display="flex" gap={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="E.g., AWS, Python, UI/UX"
                                        value={newReq}
                                        onChange={(e) => setNewReq(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: 'background.paper',
                                            }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<AddCircleOutline />}
                                        sx={{ px: 4, borderRadius: 2 }}
                                        disabled={!newReq.trim()}
                                    >
                                        Add Skill
                                    </Button>
                                </Box>
                            </form>
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
}
