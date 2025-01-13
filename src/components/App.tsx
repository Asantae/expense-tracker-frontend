import React from 'react';
import { Box, Typography } from '@mui/material';
import AppRoutes from './Routes';
import Navbar from './Navbar';

const App: React.FC = () => {
  return (
      <Box sx={{ padding: 2 }}>
        <Navbar />
        <AppRoutes />
      </Box>
  );
};

export default App;

