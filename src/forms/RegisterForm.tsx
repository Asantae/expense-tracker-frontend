import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Card, Link, Container } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { register } from '../actions/registerAction';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { hasApiActivity } from '../utils/hasApiActivityUtil';
import { loginAsGuest } from '../actions/loginGuestAction';

const RegisterForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) =>
    hasApiActivity(state, 'user/setUser/pending')
  );

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(register(email, username, password, navigate));
  };

  const handleGuestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginAsGuest(navigate));
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Card sx={{ padding: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
            Register
        </Typography>
        <form onSubmit={handleRegistration}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <CustomButton
            disabled={isLoading}
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{ mb: 2 }}
          >
            Register
          </CustomButton>
          <CustomButton
            onClick={handleGuestLogin}
            disabled={isLoading}
            variant="contained"
            fullWidth
            color="secondary"
            sx={{ mb: 2 }}
          >
            Login as guest
          </CustomButton>
        </form>
        <Link href="/login" underline="hover" sx={{ display: 'block', textAlign: 'center' }}>
          <Typography variant="body2">
            Already Have An Account? Login
          </Typography>
        </Link>
      </Card>
    </Container>
  );
};

export default RegisterForm;
