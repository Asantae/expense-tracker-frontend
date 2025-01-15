import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ComponentType;
  isAuthenticated: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, isAuthenticated, redirectTo = '/login' }) => {
  return isAuthenticated ? <Component /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;