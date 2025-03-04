import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../actions/logoutAction';
import CustomModal from '../modals/CustomModal';
import { useModal } from '../modals/useModal';
import GuestRegisterForm from '../forms/GuestRegisterForm';
import LoginForm from '../forms/LoginForm';

const Navbar: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { openModalName, openModal, closeModal } = useModal();

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isGuest = useSelector((state: RootState) => state.auth.isGuest);
    
    const handleLogout = async () => {
        await dispatch(logout(navigate))
    };

    return (
        <AppBar position="static" sx={{ marginBottom: 2 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Expense Tracker
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {!isLoggedIn && isGuest &&
                        <Box>
                            <Button
                                color="inherit"
                                sx={{ textTransform: 'none', mx: 1 }}
                                onClick={() => openModal("login")}
                            >
                                Login
                            </Button>
                            <CustomModal 
                                open={openModalName === "login"} 
                                onClose={closeModal} 
                                title="Login"
                            >
                                <LoginForm />
                            </CustomModal>
                        </Box>
                    }
                    {isGuest &&
                        <Box>                  
                            <Button
                                color="inherit"
                                sx={{ textTransform: 'none', mx: 1 }}
                                onClick={() => openModal("register")}
                            >
                                Register
                            </Button>
                            <CustomModal 
                                open={openModalName === "register"} 
                                onClose={closeModal} 
                                title="Register"
                            >
                                <GuestRegisterForm onClose={closeModal} />
                            </CustomModal>
                        </Box>     
                    }
                    {isLoggedIn &&
                        <Button
                            color="inherit"
                            sx={{ textTransform: 'none', mx: 1 }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;