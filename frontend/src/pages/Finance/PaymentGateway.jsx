import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Divider, TextField, Chip, Avatar, LinearProgress, InputAdornment } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Payment, Security, AccountBalanceWallet, CreditCard, Receipt, CheckCircle, VerifiedUser } from '@mui/icons-material';
import useAuthStore from '../../store/authStore';

export default function PaymentGateway({ 
  paymentType = "Student Service Token", 
  amount = 2000, 
  currency = "₦",
  description = "Mandatory processing token for Geo-Match placement."
}) {
  const { user } = useAuthStore();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: user?.email.split('@')[0] || '' });

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate payment API delay
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2500);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 1 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h4" fontWeight="800" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <AccountBalanceWallet sx={{ fontSize: 40, color: '#10b981' }} />
          Integrated Payment Gateway
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Secure financial module for processing {paymentType.toLowerCase()}s directly through the portal.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, bgcolor: "background.paper", borderRadius: 4, position: "relative", overflow: "hidden" }}>
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={handlePayment}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                      <Typography variant="h6" fontWeight="bold">Payment Details</Typography>
                      <Box display="flex" gap={1}>
                        <CreditCard sx={{ color: 'text.secondary' }} />
                        <Payment sx={{ color: 'text.secondary' }} />
                      </Box>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField 
                          fullWidth label="Cardholder Name" variant="outlined" 
                          value={cardDetails.name} onChange={e => setCardDetails({...cardDetails, name: e.target.value})}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                          fullWidth label="Card Number" variant="outlined" placeholder="0000 0000 0000 0000"
                          value={cardDetails.number} onChange={e => setCardDetails({...cardDetails, number: e.target.value})}
                          InputProps={{ startAdornment: <InputAdornment position="start"><CreditCard /></InputAdornment> }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          fullWidth label="Expiry Date" variant="outlined" placeholder="MM/YY"
                          value={cardDetails.expiry} onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          fullWidth label="CVC" variant="outlined" placeholder="123" type="password"
                          value={cardDetails.cvc} onChange={e => setCardDetails({...cardDetails, cvc: e.target.value})}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} mt={2}>
                        <Button 
                          type="submit" fullWidth variant="contained" size="large" disabled={processing}
                          sx={{ 
                            py: 2, fontSize: '1.1rem', borderRadius: 3,
                            background: 'linear-gradient(45deg, #10b981 30%, #34d399 90%)',
                            boxShadow: '0 4px 15px rgba(16,185,129,0.4)',
                            '&:hover': { background: 'linear-gradient(45deg, #059669 30%, #10b981 90%)', }
                          }}
                        >
                          {processing ? 'Processing Payment...' : `Pay ${currency}${amount.toLocaleString()}`}
                        </Button>
                      </Grid>
                    </Grid>

                    {processing && (
                      <Box sx={{ width: '100%', mt: 3, color: '#10b981' }}>
                        <LinearProgress color="inherit" />
                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                          Establishing secure connection to bank...
                        </Typography>
                      </Box>
                    )}
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    style={{ textAlign: 'center', padding: '40px 0' }}
                  >
                    <CheckCircle sx={{ fontSize: 80, color: '#10b981', mb: 2 }} />
                    <Typography variant="h4" fontWeight="bold" gutterBottom>Payment Successful!</Typography>
                    <Typography color="text.secondary" mb={4}>
                      Your transaction ID is #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </Typography>
                    <Button 
                      variant="outlined" color="success" onClick={() => setSuccess(false)}
                      sx={{ borderRadius: 50, px: 4 }}
                    >
                      Process Another Payment
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, bgcolor: "background.paper", borderRadius: 4, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" mb={3} display="flex" alignItems="center" gap={1}>
                <Receipt /> Order Summary
              </Typography>
              
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography color="text.secondary">Fee Type</Typography>
                <Typography fontWeight="bold">{paymentType}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography color="text.secondary">Description</Typography>
                <Typography variant="body2" sx={{ maxWidth: 200, textAlign: 'right' }}>{description}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography color="text.secondary">Processor Fee (1.5%)</Typography>
                <Typography>{currency}{(amount * 0.015).toLocaleString()}</Typography>
              </Box>
              
              <Divider sx={{ my: 3, borderColor: 'rgba(128,128,128,0.2)' }} />
              
              <Box display="flex" justifyContent="space-between" mb={4}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5" fontWeight="bold" color="success.main">
                  {currency}{(amount + amount * 0.015).toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ p: 2, bgcolor: 'rgba(16,185,129,0.1)', borderRadius: 2, border: '1px solid rgba(16,185,129,0.2)' }}>
                <Typography variant="body2" color="success.main" display="flex" alignItems="center" gap={1}>
                  <VerifiedUser fontSize="small" /> Protected by 256-bit AES encryption.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
}
