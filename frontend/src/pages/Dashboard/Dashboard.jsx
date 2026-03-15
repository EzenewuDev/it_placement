import React from 'react';
import { Box, Typography, Paper, Grid, CardContent, Divider, Chip, Avatar, Button } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, School, Business, AssignmentTurnedIn, Campaign, LocationOn, Work, ChevronRight } from '@mui/icons-material';
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

const itNews = [
  { id: 1, title: 'Federal Government Extends SIWES Submission Deadline', date: 'March 14, 2026', type: 'Official' },
  { id: 2, title: 'New Tech Hubs Open in Lagos & Abuja for IT Placement', date: 'March 10, 2026', type: 'Opportunity' },
  { id: 3, title: 'Notice: Upload Logbooks on Portal Before Month End', date: 'March 05, 2026', type: 'Urgent' }
];

const availableSlots = [
  { id: 1, company: 'Andela Nigeria', location: 'Lagos, NG', role: 'Frontend React Developer', slots: 15, tag: 'Remote Option' },
  { id: 2, company: 'Flutterwave', location: 'Abuja, NG', role: 'Backend/API Engineer', slots: 8, tag: 'High Stipend' },
  { id: 3, company: 'Paystack HQ', location: 'Lagos, NG', role: 'UI/UX Design Intern', slots: 5, tag: 'Competitive' },
  { id: 4, company: 'Ibadan Tech Hub', location: 'Ibadan, NG', role: 'Network/SysAdmin', slots: 12, tag: 'Housing Provided' }
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
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "background.paper", border: '1px solid rgba(128,128,128,0.2)', borderRadius: 8 }}
                      itemStyle={{ color: "text.primary" }}
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
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(128,128,128,0.1)' }}
                      contentStyle={{ backgroundColor: "background.paper", border: 'none', borderRadius: 8 }}
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

      {/* New Professional Functionality Sections */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={4}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box mb={2} display="flex" alignItems="center" gap={1.5}>
                <Box sx={{ p: 1, bgcolor: 'rgba(236, 72, 153, 0.1)', borderRadius: 2, color: '#ec4899', display: 'flex' }}>
                  <Campaign />
                </Box>
                <Typography variant="h6">IT Placement News</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Latest announcements for students nationwide.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                {itNews.map((news) => (
                  <Box key={news.id} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default', border: '1px solid rgba(128,128,128,0.1)', position: 'relative', overflow: 'hidden', '&:hover': { borderColor: '#ec4899', cursor: 'pointer' }, transition: 'all 0.2s' }}>
                    <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, bgcolor: news.type === 'Urgent' ? '#ef4444' : news.type === 'Official' ? '#3b82f6' : '#10b981' }} />
                    <Box display="flex" justifyContent="space-between" mb={1} pl={1}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{news.date}</Typography>
                      <Chip label={news.type} size="small" sx={{ height: 20, fontSize: '0.7rem', bgcolor: 'rgba(128,128,128,0.1)' }} />
                    </Box>
                    <Typography variant="body2" fontWeight="600" sx={{ pl: 1, lineHeight: 1.4 }}>
                      {news.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Button fullWidth endIcon={<ChevronRight />} sx={{ mt: 2, color: '#ec4899', bgcolor: 'rgba(236,72,153,0.05)' }}>
                View All Announcements
              </Button>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={8}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Box sx={{ p: 1, bgcolor: 'rgba(16, 185, 129, 0.1)', borderRadius: 2, color: '#10b981', display: 'flex' }}>
                    <Work />
                  </Box>
                  <Box>
                    <Typography variant="h6">Nationwide Active IT Slots</Typography>
                    <Typography variant="body2" color="text.secondary">Companies currently accepting students across Nigeria</Typography>
                  </Box>
                </Box>
                <Button variant="outlined" size="small" sx={{ borderColor: 'rgba(128,128,128,0.2)', color: 'text.primary', display: { xs: 'none', sm: 'block' } }}>
                  Filter Region
                </Button>
              </Box>

              <Grid container spacing={2}>
                {availableSlots.map(slot => (
                  <Grid item xs={12} sm={6} key={slot.id}>
                    <Box sx={{ p: 2, borderRadius: 3, border: '1px solid rgba(128,128,128,0.1)', bgcolor: 'background.default', '&:hover': { borderColor: '#10b981', boxShadow: '0 4px 12px rgba(16,185,129,0.05)', transform: 'translateY(-2px)' }, transition: 'all 0.2s', cursor: 'pointer' }}>
                      <Box display="flex" justifyContent="space-between" mb={1.5}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: '#6366f1', fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>
                            {slot.company.charAt(0)}
                          </Avatar>
                          <Typography variant="subtitle2" fontWeight="700">{slot.company}</Typography>
                        </Box>
                        <Chip label={`${slot.slots} Slots Left`} size="small" sx={{ bgcolor: 'rgba(16,185,129,0.1)', color: '#10b981', fontWeight: 700, borderRadius: 2 }} />
                      </Box>
                      
                      <Typography variant="body2" color="text.primary" fontWeight="500" mb={1}>{slot.role}</Typography>
                      
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
                          <LocationOn sx={{ fontSize: 14 }} />
                          <Typography variant="caption">{slot.location}</Typography>
                        </Box>
                        <Chip label={slot.tag} size="small" sx={{ height: 20, fontSize: '0.65rem', border: '1px solid rgba(128,128,128,0.2)' }} variant="outlined" />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              <Box textAlign="center" mt={3}>
                <Button endIcon={<ChevronRight />} sx={{ color: 'text.secondary', '&:hover': { color: '#10b981' } }}>
                  Browse Nationwide Directory
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
