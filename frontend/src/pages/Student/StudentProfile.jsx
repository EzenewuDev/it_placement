import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Chip, Button, Divider, LinearProgress, Avatar } from '@mui/material';
import { CloudUpload, Build, Person, CheckCircle, Description, LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';

const MOCK_SKILLS = ['Python', 'React', 'Machine Learning', 'Data Analysis', 'SQL'];

export default function StudentProfile() {
    const user = useAuthStore(state => state.user);
    const [uploading, setUploading] = useState(false);
    const [resumeUploaded, setResumeUploaded] = useState(false);

    const handleUpload = () => {
        setUploading(true);
        setTimeout(() => {
            setUploading(false);
            setResumeUploaded(true);
        }, 2000);
    };

    return (
        <Box>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <Typography variant="h4" fontWeight="700" gutterBottom>
                    My Profile
                </Typography>
                <Typography color="text.secondary" mb={4}>
                    Manage your resume, skills, and track your placement status.
                </Typography>
            </motion.div>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <Paper sx={{ p: 4, height: '100%', textAlign: 'center', background: 'rgba(17, 25, 40, 0.75)' }}>
                            <Avatar
                                sx={{
                                    width: 120, height: 120, mx: 'auto', mb: 3,
                                    bgcolor: 'primary.main', fontSize: '3rem',
                                    boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)'
                                }}
                            >
                                {user?.email?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold">
                                {user?.email?.split('@')[0]}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                                Computer Science Senior
                            </Typography>
                            <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={3}>
                                <LocationOn fontSize="small" color="action" />
                                <Typography variant="body2" color="text.secondary">San Francisco, CA</Typography>
                            </Box>
                            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.05)' }} />

                            <Box textAlign="left">
                                <Typography variant="subtitle2" color="text.secondary" mb={1} textTransform="uppercase" letterSpacing={1}>
                                    Placement Status
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <CheckCircle color="success" />
                                    <Typography fontWeight="bold" color="success.main">Ready for Match</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Box display="flex" flexDirection="column" gap={4}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <Paper sx={{ p: 4 }}>
                                <Typography variant="h6" display="flex" alignItems="center" gap={1} mb={3}>
                                    <Description color="primary" /> Resume & Experience
                                </Typography>

                                {!resumeUploaded ? (
                                    <Box
                                        sx={{
                                            border: '2px dashed rgba(255,255,255,0.2)',
                                            borderRadius: 4,
                                            p: 5,
                                            textAlign: 'center',
                                            bgcolor: 'rgba(255,255,255,0.02)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                bgcolor: 'rgba(99, 102, 241, 0.05)'
                                            }
                                        }}
                                    >
                                        {!uploading ? (
                                            <>
                                                <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                                                <Typography variant="h6" gutterBottom>Upload your Resume</Typography>
                                                <Typography variant="body2" color="text.secondary" mb={3}>
                                                    PDF, DOCX up to 5MB. We'll automatically extract your skills.
                                                </Typography>
                                                <Button variant="contained" onClick={handleUpload} sx={{ borderRadius: 8, px: 4 }}>
                                                    Browse Files
                                                </Button>
                                            </>
                                        ) : (
                                            <Box>
                                                <Typography variant="h6" mb={2} color="primary">Processing with AI...</Typography>
                                                <LinearProgress color="primary" sx={{ height: 8, borderRadius: 4 }} />
                                            </Box>
                                        )}
                                    </Box>
                                ) : (
                                    <Box sx={{ p: 3, bgcolor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 3 }}>
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <Box display="flex" alignItems="center" gap={2}>
                                                <Description sx={{ fontSize: 40, color: '#10b981' }} />
                                                <Box>
                                                    <Typography variant="h6" color="success.main">Resume Processed</Typography>
                                                    <Typography variant="body2" color="success.light">johndoe_resume_2026.pdf</Typography>
                                                </Box>
                                            </Box>
                                            <Button variant="outlined" color="success" size="small" onClick={() => setResumeUploaded(false)}>
                                                Replace
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </Paper>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <Paper sx={{ p: 4 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                                        <Build color="primary" /> Extracted Skills
                                    </Typography>
                                    <Button size="small">Edit</Button>
                                </Box>

                                {resumeUploaded ? (
                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                        {MOCK_SKILLS.map((skill, index) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.4 + (index * 0.1) }}
                                            >
                                                <Chip
                                                    label={skill}
                                                    color="primary"
                                                    sx={{
                                                        borderRadius: 2,
                                                        fontWeight: 500,
                                                        bgcolor: 'rgba(99, 102, 241, 0.2)',
                                                        color: '#818cf8',
                                                        border: '1px solid rgba(99, 102, 241, 0.3)'
                                                    }}
                                                />
                                            </motion.div>
                                        ))}
                                    </Box>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        Upload your resume to see extracted skills here.
                                    </Typography>
                                )}
                            </Paper>
                        </motion.div>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
