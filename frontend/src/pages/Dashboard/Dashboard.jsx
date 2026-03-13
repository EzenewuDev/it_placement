import React from 'react';
import { Box, Typography, Paper, Grid, CardContent, Divider, Chip } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, School, Business, AssignmentTurnedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';

const dummyData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 800 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 1200 },
  { name: 'May', value: 900 },
  { name: 'Jun', value: 1500 },
  { name: 'Jul', value: 1400 },
];

const matchData = [
  { name: 'CS', matched: 120, pending: 40 },
  { name: 'IT', matched: 98, pending: 20 },
  { name: 'SE', matched: 86, pending: 35 },
];

export default function Dashboard() {
  const user = useAuthStore(state => state.user);

  const StatCard = ({ title, value, icon, color, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Paper sx={{ p: 3, position: 'relative', overflow: 'hidden', height: '100%' }}>
        <Box sx={{ position: 'absolute', top: -15, right: -15, opacity: 0.1, color }}>
          {icon}
        </Box>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Box sx={{ bgcolor: `${color}20`, p: 1, borderRadius: 2, display: 'flex', color }}>
            {React.cloneElement(icon, { sx: { fontSize: 24 } })}
          </Box>
          <Typography variant="h6" color="text.secondary" fontWeight="500">{title}</Typography>
        </Box>
        <Typography variant="h3" fontWeight="700">{value}</Typography>
      </Paper>
    </motion.div>
  );

  return (
    <Box>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Typography variant="h4" gutterBottom>
              Welcome back, <Box component="span" color="primary.main">{user?.email?.split('@')[0]}</Box>
            </Typography>
            <Typography color="text.secondary" variant="body1">
              Here's what's happening with your placements today.
            </Typography>
          </motion.div>
        </Box>
        <Chip
          label={user?.role?.toUpperCase()}
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 'bold', px: 1, fontSize: '0.9rem' }}
        />
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Students" value="842" icon={<School sx={{ fontSize: 100 }} />} color="#6366f1" delay={0.1} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Partner Companies" value="156" icon={<Business sx={{ fontSize: 100 }} />} color="#ec4899" delay={0.2} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Matches" value="621" icon={<AssignmentTurnedIn sx={{ fontSize: 100 }} />} color="#10b981" delay={0.3} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Success Rate" value="94%" icon={<TrendingUp sx={{ fontSize: 100 }} />} color="#f59e0b" delay={0.4} />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
            <Paper sx={{ p: 3, height: 420 }}>
              <Box mb={3}>
                <Typography variant="h6">Placement Trends</Typography>
                <Typography variant="body2" color="text.secondary">Matches generated over time</Typography>
              </Box>
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dummyData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={4}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
            <Paper sx={{ p: 3, height: 420 }}>
              <Box mb={3}>
                <Typography variant="h6">Department Stats</Typography>
                <Typography variant="body2" color="text.secondary">Current academic year processing</Typography>
              </Box>
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={matchData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: 'none', borderRadius: 8 }}
                    />
                    <Bar dataKey="matched" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} barSize={24} />
                    <Bar dataKey="pending" stackId="a" fill="#334155" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
