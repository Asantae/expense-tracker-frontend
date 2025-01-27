import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 4,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ mb: 1 }}>
          Asantae's Expense Tracker App
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          © {new Date().getFullYear()} Asantae's Expense Tracker App. All rights reserved.
        </Typography>
        <Typography variant="body2">
          <Link href="/terms" color="inherit" underline="hover">
            Terms of Service
          </Link>{' '}
          |{' '}
          <Link href="/privacy" color="inherit" underline="hover">
            Privacy Policy
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;