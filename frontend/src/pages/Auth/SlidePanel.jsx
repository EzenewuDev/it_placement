import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AutoGraph, 
  Payments, 
  Map, 
  CheckCircle,
  AccountTree,
  Speed
} from '@mui/icons-material';

const slides = [
  {
    id: 1,
    title: "100% Digitization",
    subtitle: "Foundation: Holistic Placement Model",
    description: "Replacing manual ITF records with a Unified Lifecycle Management integrated platform.",
    icon: <AccountTree sx={{ fontSize: 60, color: '#ec4899' }} />,
    color: '#ec4899'
  },
  {
    id: 2,
    title: "Instant Matching in <100ms",
    subtitle: "Optimize: Real-Time ML Prediction",
    description: "98% reduction in wait time. From 14 weeks to under 72 hours using advanced Machine Learning.",
    icon: <Speed sx={{ fontSize: 60, color: '#6366f1' }} />,
    color: '#6366f1'
  },
  {
    id: 3,
    title: "Financial Autonomy",
    subtitle: "Sustain & Empower",
    description: "Self-funding model through secure payment gateways for service tokens, dues, and remuneration.",
    icon: <Payments sx={{ fontSize: 60, color: '#10b981' }} />,
    color: '#10b981'
  },
  {
    id: 4,
    title: "The 'Geo-Match' Feature",
    subtitle: "Location-Based Supervisor Pairing",
    description: "Automated geographical matching algorithm pairing students with supervisors in close proximity.",
    icon: <Map sx={{ fontSize: 60, color: '#f59e0b' }} />,
    color: '#f59e0b'
  },
  {
    id: 5,
    title: "Explainable AI (XAI)",
    subtitle: "Validate: Bias-Free Results",
    description: "Automated reasoning logic providing logic-checks and high-quality matches.",
    icon: <AutoGraph sx={{ fontSize: 60, color: '#8b5cf6' }} />,
    color: '#8b5cf6'
  }
];

export default function SlidePanel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,27,75,0.9) 100%)',
      p: 6,
      color: 'white',
      borderRight: '1px solid rgba(128,128,128,0.2)'
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.4,
        backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.15), transparent 25%), radial-gradient(circle at 85% 30%, rgba(236, 72, 153, 0.15), transparent 25%)',
        zIndex: 0
      }} />

      <Box sx={{ zIndex: 1, width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: "text.primary" }}>
          IT Placement System
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 8, letterSpacing: 1 }}>
          Aim and Objectives of the Study
        </Typography>

        <Box sx={{ position: 'relative', height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ position: 'absolute', width: '100%' }}
            >
              <Box sx={{
                width: 100, height: 100, mx: 'auto', mb: 3,
                borderRadius: '50%',
                bgcolor: 'rgba(128,128,128,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 30px ${slides[current].color}40`,
                border: `1px solid ${slides[current].color}60`
              }}>
                {slides[current].icon}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: slides[current].color }}>
                {slides[current].title}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary', textTransform: 'uppercase', letterSpacing: 1 }}>
                {slides[current].subtitle}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {slides[current].description}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
          {slides.map((s, i) => (
            <Box
              key={s.id}
              onClick={() => setCurrent(i)}
              sx={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === current ? s.color : 'rgba(128,128,128,0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
