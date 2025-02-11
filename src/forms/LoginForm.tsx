import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/loginAction';
import { TextField, Typography, Card, Link, Container } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { hasApiActivity } from '../utils/hasApiActivityUtil';
import { loginAsGuest } from '../actions/loginGuestAction';

const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) =>
    hasApiActivity(state, 'user/setUser/pending')
  );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if(!username || !password){ return; }

    await dispatch(login(username, password, navigate));
  };

  const handleGuestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginAsGuest(navigate));
  };

  return (
    <Container maxWidth="xs" sx={{ px: 0, mx: 2 }}>
      <Card sx={{ padding: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            error={submitted && !username}
            disabled={isLoading}
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
            helperText={submitted && !username ? "This is a required field." : ""}
          />
          <TextField
            error={submitted && !password}
            disabled={isLoading}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            helperText={submitted && !password ? "This is a required field." : ""}
          />
          <CustomButton
            disabled={isLoading}
            loading={isLoading}
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{ mb: 2 }}
          >
            Login
          </CustomButton>
          <CustomButton
            onClick={handleGuestLogin}
            loading={isLoading}
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