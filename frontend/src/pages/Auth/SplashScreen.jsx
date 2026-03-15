import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AutoGraph,
  Payments,
  Map,
  AccountTree,
  Speed,
  School,
  ArrowForward
} from '@mui/icons-material';
import useAuthStore from '../../store/authStore';

const slides = [
  {
    id: 1,
    title: "IT Placement System",
    subtitle: "A Next-Generation Portal",
    description: "Connecting students, companies and universities through a unified, AI-powered platform.",
    icon: <School sx={{ fontSize: 70, color: '#818cf8' }} />,
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
  },
  {
    id: 2,
    title: "100% Digitization",
    subtitle: "Foundation: Holistic Placement Model",
    description: "Replacing manual ITF records with a Unified Lifecycle Management integrated platform.",
    icon: <AccountTree sx={{ fontSize: 70, color: '#ec4899' }} />,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #3b0764 100%)'
  },
  {
    id: 3,
    title: "Instant ML Matching",
    subtitle: "Real-Time AI Prediction in <100ms",
    description: "98% reduction in wait time. From 14 weeks to under 72 hours using advanced Machine Learning.",
    icon: <Speed sx={{ fontSize: 70, color: '#6366f1' }} />,
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
  },
  {
    id: 4,
    title: "Geo-Match Feature",
    subtitle: "Location-Based Supervisor Pairing",
    description: "Automated geographical matching pairing students with supervisors in close proximity across Nigeria.",
    icon: <Map sx={{ fontSize: 70, color: '#f59e0b' }} />,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1c1002 100%)'
  },
  {
    id: 5,
    title: "Integrated Payments",
    subtitle: "Financial Autonomy & Security",
    description: "Self-funding model through secure payment gateways for student tokens, company dues, and remuneration.",
    icon: <Payments sx={{ fontSize: 70, color: '#10b981' }} />,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #022c22 100%)'
  }
];

const SLIDE_DURATION = 3000; // ms per slide

export default function SplashScreen() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  // If already authenticated, skip straight to dashboard
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  // Auto-advance slides
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
    }, 30);

    const timer = setTimeout(() => {
      setCurrent(prev => {
        if (prev + 1 >= slides.length) {
          navigate('/login');
          return prev;
        }
        return prev + 1;
      });
    }, SLIDE_DURATION);

    return () => { clearInterval(tick); clearTimeout(timer); };
  }, [current, navigate]);

  const goToLogin = () => navigate('/login');

  const slide = slides[current];

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: slide.gradient,
      position: 'relative',
      overflow: 'hidden',
      pb: 6,
      pt: 8,
      px: 3,
      transition: 'background 0.8s ease'
    }}>
      {/* Ambient glow blobs */}
      <Box sx={{
        position: 'absolute', top: -100, left: -100, width: 350, height: 350,
        borderRadius: '50%', bgcolor: `${slide.color}20`, filter: 'blur(80px)', zIndex: 0,
        transition: 'background-color 0.8s ease'
      }} />
      <Box sx={{
        position: 'absolute', bottom: -80, right: -80, width: 300, height: 300,
        borderRadius: '50%', bgcolor: 'rgba(99,102,241,0.15)', filter: 'blur(80px)', zIndex: 0
      }} />

      {/* Skip button */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', zIndex: 2 }}>
        <Button
          onClick={goToLogin}
          size="small"
          sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'none', fontWeight: 600, '&:hover': { color: '#fff' } }}
        >
          Skip →
        </Button>
      </Box>

      {/* Main slide content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2, width: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.92 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ textAlign: 'center', width: '100%' }}
          >
            {/* Icon circle */}
            <Box sx={{
              width: 130, height: 130,
              mx: 'auto', mb: 5,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `radial-gradient(circle, ${slide.color}25 0%, transparent 70%)`,
              border: `2px solid ${slide.color}50`,
              boxShadow: `0 0 50px ${slide.color}35`,
              backdropFilter: 'blur(10px)'
            }}>
              {slide.icon}
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', mb: 1.5, lineHeight: 1.2 }}>
              {slide.title}
            </Typography>

            <Typography variant="subtitle2" sx={{
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5,
              color: slide.color, mb: 3, fontSize: '0.75rem'
            }}>
              {slide.subtitle}
            </Typography>

            <Typography variant="body1" sx={{
              color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 320, mx: 'auto', fontSize: '1rem'
            }}>
              {slide.description}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Bottom section */}
      <Box sx={{ width: '100%', zIndex: 2 }}>
        {/* Slide progress dots */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: 4 }}>
          {slides.map((s, i) => (
            <Box
              key={s.id}
              onClick={() => setCurrent(i)}
              sx={{
                width: i === current ? 32 : 10,
                height: 10,
                borderRadius: 5,
                bgcolor: i === current ? slide.color : 'rgba(255,255,255,0.2)',
                transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                cursor: 'pointer'
              }}
            />
          ))}
        </Box>

        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            mb: 4, height: 3, borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: slide.color,
              borderRadius: 2,
              transition: 'none'
            }
          }}
        />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={goToLogin}
            sx={{
              py: 2,
              borderRadius: 50,
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'none',
              background: `linear-gradient(135deg, #6366f1, ${slide.color})`,
              boxShadow: `0 8px 32px ${slide.color}40`,
              transition: 'all 0.4s ease',
              '&:hover': {
                boxShadow: `0 12px 40px ${slide.color}60`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}
