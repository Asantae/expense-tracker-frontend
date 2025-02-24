import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import { Container } from '@mui/material';

const RegisterPage: React.FC = () => {
  return (
    <Container 
      maxWidth="xs" 
    >
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;