import React from 'react';
import { Box, Typography } from '@mui/material';
import AppRoutes from './Routes';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  
  return (
      <Box sx={{ padding: 2 }}>
        {shouldShowNavbar && <Navbar />}
        <AppRoutes />
        <ToastContainer />
      </Box>
  );
};

export default App;

