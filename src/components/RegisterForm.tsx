import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography, Card, Link } from '@mui/material';
import { AppDispatch } from '../store/store';
import { register } from '../actions/registerAction';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

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
                <Button type="submit" variant="contained" fullWidth color="primary">
                    Register
                </Button>
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