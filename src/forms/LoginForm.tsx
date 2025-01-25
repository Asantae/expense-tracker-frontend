import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/loginAction';
import { TextField, Typography, Card, Link } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { hasApiActivity } from '../utils/hasApiActivityUtil';

const LoginForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state: RootState) =>
        hasApiActivity(state, 'user/setUser/pending')
    );

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
                <CustomButton disabled={isLoading} type="submit" variant="contained" fullWidth color="primary">
                    Login
                </CustomButton>
                {/* <CustomButton disabled={isLoading} type="submit" variant="contained" fullWidth color="primary">
                    Temporary Guest Login Button 
                </CustomButton> */}
            </form>
            <Link href="/register" underline="hover" paddingX={5} >
                <Typography>
                    Don't Have An Account?
                </Typography>
            </Link>
        </Card>
    );
};

export default LoginForm;