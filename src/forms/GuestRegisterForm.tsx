import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Card, Link, Container } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { hasApiActivity } from '../utils/hasApiActivityUtil';
import { registerGuest } from '../actions/registerGuestAction';

interface GuestRegisterFormProps {
    onClose: () => void;
}

const GuestRegisterForm: React.FC<GuestRegisterFormProps> = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) =>
    hasApiActivity(state, 'user/setUser/pending')
  );

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleGuestRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(registerGuest(email, username, password, navigate));

    onClose;
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
        <form onSubmit={handleGuestRegistration}>
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
        </form>
    </Container>
  );
};

export default GuestRegisterForm;