import React from 'react';
import LoginForm from '../components/LoginForm';
import { Box, Typography } from '@mui/material';

const LoginPage: React.FC = () => {
  return (
    <Box
    >
      <Typography>Login</Typography>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;