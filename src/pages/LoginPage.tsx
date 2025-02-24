import React from 'react';
import LoginForm from '../forms/LoginForm';
import { Container } from '@mui/material';

const LoginPage: React.FC = () => {
  return (
    <Container 
      maxWidth="xs" 
    >
      <LoginForm />
    </Container>
  );
};

export default LoginPage;