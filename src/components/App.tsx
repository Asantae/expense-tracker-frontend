import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './Routes';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import theme from '../theme';
import Footer from './Footer';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register', '/'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          {shouldShowNavbar && <Navbar />}
          <Box
            component="main"
            sx={{
              height: "100%",
              marginBottom: 5,
              flex: 1,
              ...(!shouldShowNavbar && {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              })
            }}
          >
            <AppRoutes />
          </Box>
          <Footer />
          <ToastContainer />
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;