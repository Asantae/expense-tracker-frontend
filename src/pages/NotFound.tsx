import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary">
        Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;