import React, { ReactNode } from "react";
import { AppBar, Toolbar, Container, Box, Typography } from "@mui/material";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Expense Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
      <Footer/>
    </Box>
  );
};

export default Layout;