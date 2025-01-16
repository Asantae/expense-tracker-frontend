import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Container, Typography, Card } from '@mui/material';
import { AppDispatch } from '../store/store';
import { register } from '../actions/registerAction';

const RegisterForm = () => {
    const dispatch: AppDispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(register(email, username, password));
    };

    return (
        <Card>
            <Typography variant="h5" gutterBottom>
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
                <Button type="submit" variant="contained" fullWidth color="primary">
                    Register
                </Button>
            </form>
        </Card>
    );
};

export default RegisterForm;