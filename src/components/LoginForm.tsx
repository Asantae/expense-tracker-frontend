import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../actions/authActions';
import { Button, TextField, Container, Typography, Card } from '@mui/material';
import { AppDispatch } from '../store/store';

const LoginForm = () => {
    const dispatch: AppDispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(loginAction(username, password));
    };

    return (
        <Card>
            <Typography variant="h5" gutterBottom>
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