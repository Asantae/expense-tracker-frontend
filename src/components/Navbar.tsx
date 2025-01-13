import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static" sx={{ marginBottom: 2 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Expense Tracker
                </Typography>
                <Box>
                    <Button
                        component={Link}
                        to="/"
                        color="inherit"
                        sx={{ textTransform: 'none' }}
                    >
                        Categories
                    </Button>
                    <Button
                        component={Link}
                        to="/expenses"
                        color="inherit"
                        sx={{ textTransform: 'none' }}
                    >
                        Expenses
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;