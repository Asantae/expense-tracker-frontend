import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/loginAction';
import { Button, TextField, Typography, Card } from '@mui/material';
import { AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(login(username, password, navigate));
    };

    return (
        <Card>
            <Typography variant="h4" gutterBottom>
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
                />
                <Button type="submit" variant="contained" fullWidth color="primary">
                    Login
                </Button>
            </form>
        </Card>
    );
};

export default LoginForm;