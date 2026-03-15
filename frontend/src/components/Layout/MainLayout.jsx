import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Avatar, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Dashboard as DashboardIcon, Logout as LogoutIcon, Person as PersonIcon, Psychology as PsychologyIcon, School as SchoolIcon, Business as BusinessIcon, Map as MapIcon, PaymentsOutlined as PaymentsIcon, AssignmentInd as SupervisorIcon, LightMode, DarkMode } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import useThemeStore from '../../store/themeStore';

const drawerWidth = 260;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [isHovered, setIsHovered] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Overview', icon: <DashboardIcon />, roles: ['admin', 'student', 'company'] },
    { path: '/admin/overview', label: 'Admin Dashboard', icon: <DashboardIcon />, roles: ['admin'] },
    { path: '/admin/supervisor', label: 'Supervisor Hub', icon: <SupervisorIcon />, roles: ['admin'] },
    { path: '/admin/matching', label: 'AI Matching Engine', icon: <PsychologyIcon />, roles: ['admin'] },
    { path: '/student/profile', label: 'My Profile', icon: <PersonIcon />, roles: ['student'] },
    { path: '/student/geomatch', label: 'Geo-Match Insights', icon: <MapIcon />, roles: ['student'] },
    { path: '/student/payment', label: 'Pay Placement Token', icon: <PaymentsIcon />, roles: ['student'] },
    { path: '/company/profile', label: 'Company Profile', icon: <BusinessIcon />, roles: ['company'] },
    { path: '/company/payment', label: 'Pay Annual Dues', icon: <PaymentsIcon />, roles: ['company'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box 
            display="flex" 
            alignItems="center" 
            gap={2} 
            onClick={() => navigate('/dashboard')}
            sx={{ cursor: 'pointer', transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 } }}
          >
            <Box sx={{
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              p: 1,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center'
            }}>
              <SchoolIcon sx={{ color: '#6366f1' }} />
            </Box>
            <Typography variant="h6" noWrap sx={{ fontWeight: 700, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              IT Placement Engine
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={3}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar sx={{ bgcolor: '#6366f1', width: 32, height: 32, fontSize: '0.875rem', fontWeight: 600 }}>
                {user?.email?.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                  {user?.email}
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', textTransform: 'capitalize' }}>
                  {user?.role} Portal
                </Typography>
              </Box>
            </Box>
            
            <Tooltip title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  color: isDark ? '#fff' : '#000',
                  '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
                }}
              >
                {isDark ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Secure Logout">
              <IconButton
                onClick={handleLogout}
                sx={{
                  bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(255, 255, 255, 0.05)'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {filteredMenu.map((item, index) => {
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <ListItem
                  button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  sx={{
                    borderRadius: 3,
                    mb: 0.5,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    color: isActive ? (isDark ? '#fff' : '#000') : (isDark ? '#94a3b8' : '#64748b'),
                    bgcolor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    '&:hover': {
                      bgcolor: isActive ? 'rgba(99, 102, 241, 0.2)' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)')
                    }
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        backgroundColor: '#6366f1',
                        borderRadius: '0 4px 4px 0'
                      }}
                    />
                  )}
                  <ListItemIcon sx={{
                    color: isActive ? '#818cf8' : (isHovered === index ? (isDark ? '#fff' : '#000') : 'inherit'),
                    minWidth: 40,
                    transition: 'color 0.3s ease'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.95rem'
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4, pt: 11, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
            style={{ width: '100%', height: '100%' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
