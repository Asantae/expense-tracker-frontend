import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import NotFound from '../pages/NotFound';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { getToken, isTokenValid } from '../utils/tokenUtil';

const AppRoutes: React.FC = () => {
  const token = getToken() ?? "";
  const isAuthenticated = isTokenValid(token);
  
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <LoginPage/>
        } 
      />
      <Route 
        path="/register" 
        element={
          <RegisterPage/>
        } 
      />
      <Route
        path="/dashboard/user/:userId"
        element={
          <ProtectedRoute
            component={Dashboard}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route path="*" element={<NotFound />} /> 
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;