import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Chip, Avatar, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Map, PersonPin, CorporateFare, CheckCircleOutline, WorkHistory, Assessment } from '@mui/icons-material';
import useAuthStore from '../../store/authStore';

const dummyMatchData = {
  company: "TechNova Solutions Ltd",
  companyLocation: "Lekki Phase 1, Lagos",
  proximity: "4.2 km from base",
  supervisorName: "Dr. Olayinka Adebayo",
  supervisorCoverage: "Lagos Island / Lekki Zone",
  status: "Matched & Verified",
  trainingProgress: 65,
  overallWeeks: 24,
  currentWeek: 15.6,
};

export default function GeoMatchStatus() {
  const { user } = useAuthStore();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 1 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h4" fontWeight="800" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Map sx={{ fontSize: 40, color: '#f59e0b' }} />
          Geo-Match Insights & Progress
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Automated Location-Based Pairing tracking between your assigned company and supervising lecturer.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, height: '100%', bgcolor: "background.paper", borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
              <Box sx={{
                position: 'absolute', top: -30, right: -30, opacity: 0.05,
                width: 200, height: 200, borderRadius: '50%', bgcolor: '#f59e0b'
              }} />
              
              <Typography variant="h5" fontWeight="bold" mb={3} display="flex" alignItems="center" gap={1}>
                <CorporateFare color="secondary" /> Assigned Placement
              </Typography>
              
              <Box p={3} bgcolor="background.paper" borderRadius={3} mb={3} border="1px solid rgba(128,128,128,0.1)">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography color="text.secondary" variant="body2">Company Partner</Typography>
                    <Typography variant="h6" fontWeight="bold">{dummyMatchData.company}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary" variant="body2">Location</Typography>
                    <Typography variant="body1">{dummyMatchData.companyLocation}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="text.secondary" variant="body2">System Status</Typography>
                    <Chip size="small" icon={<CheckCircleOutline />} label={dummyMatchData.status} color="success" sx={{ mt: 0.5, fontWeight: 'bold' }} />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3, borderColor: 'rgba(128,128,128,0.1)' }} />

              <Typography variant="h5" fontWeight="bold" mb={3} display="flex" alignItems="center" gap={1}>
                <PersonPin color="primary" /> Field Supervisor
              </Typography>
              
              <Box p={3} bgcolor="background.paper" borderRadius={3} mb={2} border="1px solid rgba(128,128,128,0.1)">
                <Box display="flex" gap={2} alignItems="center">
                  <Avatar sx={{ width: 60, height: 60, bgcolor: '#6366f1', fontSize: '1.5rem' }}>
                    {dummyMatchData.supervisorName.charAt(4)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">{dummyMatchData.supervisorName}</Typography>
                    <Typography color="text.secondary" variant="body2" display="flex" alignItems="center" gap={0.5}>
                       Coverage Zone: <Map fontSize="small" /> {dummyMatchData.supervisorCoverage}
                    </Typography>
                    <Chip 
                      size="small" variant="outlined" 
                      label={`Proximity: ${dummyMatchData.proximity}`} 
                      sx={{ mt: 1, borderColor: '#f59e0b', color: '#fbd38d' }}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, bgcolor: "background.paper", borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" fontWeight="bold" mb={3} display="flex" alignItems="center" gap={1}>
                <WorkHistory color="secondary" /> Training Progress
              </Typography>
              
              <Box mb={4}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body1" fontWeight="bold">Week {Math.floor(dummyMatchData.currentWeek)} of {dummyMatchData.overallWeeks}</Typography>
                  <Typography variant="body2" color="text.secondary">{dummyMatchData.trainingProgress}% Completed</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={dummyMatchData.trainingProgress} 
                  sx={{ 
                    height: 12, borderRadius: 6, bgcolor: 'rgba(128,128,128,0.2)',
                    '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #ec4899, #8b5cf6)' }
                  }} 
                />
              </Box>

              <Typography variant="h6" mb={2}>Recent Evaluations</Typography>
              <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
                {[1, 2, 3].map((val, idx) => (
                  <Box key={val} p={2} mb={2} bgcolor="rgba(128,128,128,0.05)" borderRadius={2} borderLeft="3px solid #8b5cf6">
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" fontWeight="bold">Monthly Report #{val}</Typography>
                      <Typography variant="caption" color="text.secondary">Reviewed</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Supervisor noted excellent foundational understanding in backend systems alignment. 
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
}
