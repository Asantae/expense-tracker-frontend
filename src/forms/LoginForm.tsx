import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/loginAction';
import { TextField, Typography, Card, Link, Box, Container } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { hasApiActivity } from '../utils/hasApiActivityUtil';

const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) =>
    hasApiActivity(state, 'user/setUser/pending')
  );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(username, password, navigate));
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Card sx={{ padding: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 4 }}
          />
          <CustomButton
            disabled={isLoading}
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{ mb: 2 }}
          >
            Login
          </CustomButton>
          <CustomButton
            disabled={isLoading}
            variant="contained"
            fullWidth
            color="secondary"
            sx={{ mb: 2 }}
          >
            Login as guest
          </CustomButton>
        </form>
        <Link href="/register" underline="hover" sx={{ display: 'block', textAlign: 'center' }}>
          <Typography variant="body2">
            Don't Have An Account? Register
          </Typography>
        </Link>
      </Card>
    </Container>
  );
};

export default LoginForm;