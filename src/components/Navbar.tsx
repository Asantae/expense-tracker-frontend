import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../actions/logoutAction';

const Navbar: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    
    const handleLogout = async () => {
        await dispatch(logout(navigate))
    };

    return (
        <AppBar position="static" sx={{ marginBottom: 2 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Expense Tracker
                </Typography>
                <Box>
                    {isLoggedIn ? (
                        <Button
                            color="inherit"
                            sx={{ textTransform: 'none', mx: 1 }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            component={Link}
                            to="/login"
                            color="inherit"
                            sx={{ textTransform: 'none', mx: 1 }}
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;