import React from 'react';
import LoginForm from '../forms/LoginForm';
import { Box, Container } from '@mui/material';

const LoginPage: React.FC = () => {
  return (
    <Container 
      maxWidth="xs" 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        mt: 8
      }}
    >
      <LoginForm />
    </Container>
  );
};

export default LoginPage;