import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Card, Link, Container } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { hasApiActivity } from '../utils/hasApiActivityUtil';
import { registerGuest } from '../actions/registerGuestAction';
import { checkPasswordMatch } from '../utils/formUtil';

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
  const [passwordReEntry, setPasswordReEntry] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleGuestRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if(!username || !password){ return; }

    if(!checkPasswordMatch(password, passwordReEntry)){
      return;
    }

    await dispatch(registerGuest(email, username, password, navigate));

    onClose;
  };

  return (
    <Container maxWidth="xs">
        <form onSubmit={handleGuestRegistration}>
          <TextField
            error={submitted && !email}
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            helperText={submitted && !email ? "This is a required field." : ""}
          />
          <TextField
            error={submitted && !username}
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
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            helperText={submitted && !password ? "This is a required field." : ""}
          />
          {password && <TextField
            error={submitted && !checkPasswordMatch(password, passwordReEntry)}
            disabled={isLoading}
            label="Re-Enter Password"
            type="password"
            variant="outlined"
            fullWidth
            value={passwordReEntry}
            onChange={(e) => setPasswordReEntry(e.target.value)}
            sx={{ mb: 2, mt: 2 }}     
            helperText={submitted && passwordReEntry && !checkPasswordMatch(password, passwordReEntry) ? "Passwords must match." : ""}     
          />}
          <CustomButton
            disabled={isLoading}
            loading={isLoading}
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