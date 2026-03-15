import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { AssignmentInd, PeopleAlt, Map, Analytics, HistoryEdu } from '@mui/icons-material';

const dummyCohort = [
  { id: 1, name: "David Onyedika", company: "Interswitch", location: "Victoria Island", progress: 85, zone: "Lagos Mainland" },
  { id: 2, name: "Sarah Chuks", company: "Flutterwave", location: "Lekki Phase 1", progress: 60, zone: "Lagos Island" },
  { id: 3, name: "Emmanuel Eze", company: "Paystack", location: "Ikeja", progress: 92, zone: "Lagos Mainland" },
  { id: 4, name: "Aisha Mohammed", company: "Andela", location: "Victoria Island", progress: 45, zone: "Lagos Island" },
];

export default function SupervisorDashboard() {
  const [cohort] = useState(dummyCohort);

  return (
    <Box>
      <Box mb={5}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Typography variant="h3" fontWeight="800" sx={{ background: 'linear-gradient(to right, #4ade80, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <AssignmentInd sx={{ color: '#4ade80', fontSize: 40 }} /> Supervisor Dashboard
          </Typography>
          <Typography color="text.secondary" variant="h6">
            Centralized administrative portal to track assigned cohort's status and training progress in real-time.
          </Typography>
        </motion.div>
      </Box>

      <Grid container spacing={3} mb={6}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: "background.paper", borderRadius: 3, borderLeft: '4px solid #3b82f6' }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">Total Assigned</Typography>
              <PeopleAlt sx={{ color: '#3b82f6' }} />
            </Box>
            <Typography variant="h3" fontWeight="bold">124</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: "background.paper", borderRadius: 3, borderLeft: '4px solid #f59e0b' }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">Active Zones</Typography>
              <Map sx={{ color: '#f59e0b' }} />
            </Box>
            <Typography variant="h3" fontWeight="bold">3</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: "background.paper", borderRadius: 3, borderLeft: '4px solid #10b981' }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">Avg. Progress</Typography>
              <Analytics sx={{ color: '#10b981' }} />
            </Box>
            <Typography variant="h3" fontWeight="bold">68%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: "background.paper", borderRadius: 3, borderLeft: '4px solid #8b5cf6' }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">Assessments Due</Typography>
              <HistoryEdu sx={{ color: '#8b5cf6' }} />
            </Box>
            <Typography variant="h3" fontWeight="bold">12</Typography>
          </Paper>
        </Grid>
      </Grid>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
        <Paper sx={{ p: 4, bgcolor: "background.paper", borderRadius: 4, overflow: 'hidden' }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>Cohort Geographical Placement Tracker</Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ '& th': { color: 'text.secondary', fontWeight: 'bold' } }}>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Geo-Location</TableCell>
                  <TableCell>Coverage Zone</TableCell>
                  <TableCell>Training Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cohort.map((student) => (
                  <TableRow key={student.id} sx={{ '& td': { borderBottom: '1px solid rgba(128,128,128,0.1)' } }}>
                    <TableCell sx={{ fontWeight: 600 }}>{student.name}</TableCell>
                    <TableCell>{student.company}</TableCell>
                    <TableCell>{student.location}</TableCell>
                    <TableCell>
                      <Chip 
                        label={student.zone} size="small" 
                        variant="outlined" 
                        sx={{ color: student.zone.includes('Island') ? '#f472b6' : '#60a5fa', borderColor: 'currentColor' }} 
                      />
                    </TableCell>
                    <TableCell sx={{ width: '25%' }}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box width="100%">
                          <LinearProgress 
                            variant="determinate" 
                            value={student.progress} 
                            sx={{ 
                              height: 8, borderRadius: 4, bgcolor: 'rgba(128,128,128,0.2)',
                              '& .MuiLinearProgress-bar': { background: student.progress > 80 ? '#10b981' : '#6366f1' }
                            }} 
                          />
                        </Box>
                        <Typography variant="body2">{student.progress}%</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </motion.div>
    </Box>
  );
}
