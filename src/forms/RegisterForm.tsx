import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Card, Link, Container } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { register } from '../actions/registerAction';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { hasApiActivity } from '../utils/hasApiActivityUtil';
import { loginAsGuest } from '../actions/loginGuestAction';
import { checkPasswordMatch } from '../utils/formUtil';

const RegisterForm = () => {
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

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if(!username || !password){ return; }

    if(!checkPasswordMatch(password, passwordReEntry)){
      return;
    }
    
    await dispatch(register(email, username, password, navigate));
  };

  const handleGuestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginAsGuest(navigate));
  };

  return (
    <Container maxWidth="xs">
      <Card sx={{ padding: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
            Register
        </Typography>
        <form onSubmit={handleRegistration}>
          <TextField
            error={submitted && !email}
            disabled={isLoading}
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
          {password && <TextField
            error={submitted && !checkPasswordMatch(password, passwordReEntry)}
            disabled={isLoading}
            label="Re-Enter Password"
            type="password"
            variant="outlined"
            fullWidth
            value={passwordReEntry}
            onChange={(e) => setPasswordReEntry(e.target.value)}
            sx={{ mb: 2 }}     
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
