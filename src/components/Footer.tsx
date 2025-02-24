import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import Grid2 from '@mui/material/Grid2';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Grid2>
            <Typography variant="h6">Asantae's Expense Tracker App</Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body2">
              © {new Date().getFullYear()} Asantae's Expense Tracker App. All rights reserved.
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body2">
              <Link href="https://asantaems.com" target="_blank" color="inherit" underline="hover">
                Portfolio
              </Link>{' '}
              |{' '}
              <Link href="/terms" color="inherit" underline="hover">
                Terms of Service
              </Link>{' '}
              |{' '}
              <Link href="/privacy" color="inherit" underline="hover">
                Privacy Policy
              </Link>
            </Typography>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Footer;
