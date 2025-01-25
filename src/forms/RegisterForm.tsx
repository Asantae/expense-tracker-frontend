import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Card, Link } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { register } from '../actions/registerAction';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { hasApiActivity } from '../utils/hasApiActivityUtil';

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

    return (
        <Card>
            <Typography variant="h4" gutterBottom>
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
                />
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
                />
                <CustomButton disabled={isLoading} type="submit" variant="contained" fullWidth color="primary">
                    Register
                </CustomButton>
            </form>
            <Link href="/login" underline="hover">
                <Typography>
                    Already Have An Account?
                </Typography>
            </Link>
        </Card>
    );
};

export default RegisterForm;