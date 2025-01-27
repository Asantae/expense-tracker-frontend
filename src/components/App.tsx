import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './Routes';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import theme from '../theme';
import Footer from './Footer';

const App: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register', '/'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {shouldShowNavbar && <Navbar />}
        <Box
          component="main"
          sx={{
            marginBottom: 5,
            flex: 1,
          }}
        >
          <AppRoutes />
        </Box>
        <Footer />
        <ToastContainer />
      </Box>
    </ThemeProvider>
  );
};

export default App;