import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from '../pages/CategoryPage';
import ExpensePage from '../pages/ExpensePage';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import NotFound from '../pages/NotFound';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import UserDashboard from './UserDashboard';
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
            component={UserDashboard}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route
          path="/categories"
          element={
          <ProtectedRoute
            component={CategoryPage}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route
        path="/expenses"
        element={
          <ProtectedRoute
            component={ExpensePage}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route path="*" element={<NotFound />} /> 
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;