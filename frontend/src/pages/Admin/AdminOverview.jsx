import React from 'react';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { AccountTree, TrendingUp, AccessTime, Autorenew, Security, Map, Payments } from '@mui/icons-material';

const phases = [
  { step: 1, title: 'Foundation', subtitle: 'Holistic Placement Model', desc: '100% digitization of manual ITF records.', icon: <AccountTree sx={{ fontSize: 50, color: '#ec4899' }} />, metrics: 'Unified Lifecycle Management' },
  { step: 2, title: 'Sustain', subtitle: 'Financial Autonomy', desc: 'Self-funding for server maintenance via token fees & dues.', icon: <Payments sx={{ fontSize: 50, color: '#10b981' }} />, metrics: 'Secure Payment Gateway' },
  { step: 3, title: 'Optimize', subtitle: 'Real-Time Matching', desc: '98% reduction in wait time (14 weeks → 72 hours).', icon: <AccessTime sx={{ fontSize: 50, color: '#6366f1' }} />, metrics: 'ML Prediction (<100ms)' },
  { step: 4, title: 'Empower', subtitle: 'Selection Workflow', desc: 'Average of 3+ high-quality matches per student.', icon: <Autorenew sx={{ fontSize: 50, color: '#f59e0b' }} />, metrics: 'Student-Led Choice' },
  { step: 5, title: 'Validate', subtitle: 'Explainable AI (XAI)', desc: '"Logic-Check" availability for automated reasoning.', icon: <Security sx={{ fontSize: 50, color: '#8b5cf6' }} />, metrics: 'Bias-Free Logic' },
];

export default function AdminOverview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Box>
      <Box mb={5}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Typography variant="h3" fontWeight="800" sx={{ background: 'linear-gradient(to right, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1 }}>
            Admin Control Center
          </Typography>
          <Typography color="text.secondary" variant="h6">
            Aims, Objectives and Geo-Match Operations
          </Typography>
        </motion.div>
      </Box>

      <Typography variant="h5" fontWeight="700" mb={3} display="flex" alignItems="center" gap={1}>
        <TrendingUp color="primary" /> Study Objectives & Workflow
      </Typography>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Grid container spacing={3} mb={6}>
          {phases.map((phase) => (
            <Grid item xs={12} md={6} lg={4} xl={2.4} key={phase.step}>
              <motion.div variants={itemVariants} style={{ height: '100%' }}>
                <Paper
                  sx={{
                    p: 3, height: '100%', position: 'relative', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                    bgcolor: "background.paper", backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(128,128,128,0.1)',
                    transition: 'all 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }
                  }}
                >
                  <Box sx={{
                    position: 'absolute', top: -10, left: -10,
                    width: 60, height: 60, borderRadius: '50%',
                    bgcolor: 'rgba(128,128,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: '1.5rem', color: 'rgba(128,128,128,0.3)'
                  }}>
                    {phase.step}
                  </Box>
                  <Box sx={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    {phase.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary" }}>{phase.title}</Typography>
                  <Typography variant="body2" sx={{ color: phase.icon.props.sx.color, mb: 2, fontWeight: 600, letterSpacing: 0.5 }}>{phase.subtitle.toUpperCase()}</Typography>
                  
                  <Divider sx={{ width: '100%', mb: 2, borderColor: 'rgba(128,128,128,0.1)' }} />
                  
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>{phase.desc}</Typography>
                  <Typography variant="caption" sx={{ bgcolor: 'rgba(128,128,128,0.1)', px: 1.5, py: 0.5, borderRadius: 2, color: '#cbd5e1' }}>
                    {phase.metrics}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" fontWeight="700" mb={3} display="flex" alignItems="center" gap={1}>
          <Map color="secondary" /> Supervisor & School Integration (Geo-Match)
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants} style={{ height: '100%' }}>
              <Paper sx={{ p: 4, height: '100%', bgcolor: "background.paper", borderTop: '4px solid #f59e0b' }}>
                <Typography variant="h6" fontWeight="bold" mb={2} color="#f59e0b">Location-Based Pairing</Typography>
                <Typography color="text.secondary" lineHeight={1.8}>
                   Automated matching algorithm that pairs students with school supervisors based on geographical proximity of the company address to the supervisor's assigned coverage zone (e.g., Abeokuta, Abuja, Lagos).
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants} style={{ height: '100%' }}>
              <Paper sx={{ p: 4, height: '100%', bgcolor: "background.paper", borderTop: '4px solid #6366f1' }}>
                <Typography variant="h6" fontWeight="bold" mb={2} color="#818cf8">Supervisor Dashboard</Typography>
                <Typography color="text.secondary" lineHeight={1.8}>
                  A centralized administrative portal for lecturers to track their assigned cohort's status, location, and training progress in real-time.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants} style={{ height: '100%' }}>
              <Paper sx={{ p: 4, height: '100%', bgcolor: "background.paper", borderTop: '4px solid #10b981' }}>
                <Typography variant="h6" fontWeight="bold" mb={2} color="#34d399">Integrated Payment Gateway</Typography>
                <Typography color="text.secondary" lineHeight={1.8}>
                  Secure financial module for processing student service tokens (1,000–2,000 Naira), company annual dues, and supervisor remuneration.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
}
