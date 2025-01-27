import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import { Box, Container, Typography } from '@mui/material';

const RegisterPage: React.FC = () => {
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
      <Box>
        <RegisterForm />
      </Box>
    </Container>
  );
};

export default RegisterPage;