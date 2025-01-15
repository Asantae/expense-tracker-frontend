import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from '../pages/CategoryPage';
import ExpensePage from '../pages/ExpensePage';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Dashboard from './Dashboard';
import LoginForm from './LoginForm';
import NotFound from '../pages/NotFound';

const AppRoutes: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const isAuthenticated = Boolean(token);
  return (
    <Routes>
      <Route 
        path="/"
        element={
          <ProtectedRoute
            component={Dashboard}
            isAuthenticated={isAuthenticated}
            redirectTo="/login"
          />
        } 
      />
      <Route 
        path="/login" 
        element={
          <LoginForm/>
        } 
        />
      <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              component={Dashboard}
              isAuthenticated={isAuthenticated}
              redirectTo="/login"
            />
          }
        />
      <Route
          path="/categories"
          element={
            <ProtectedRoute
              component={CategoryPage}
              isAuthenticated={isAuthenticated}
              redirectTo="/login"
            />
        }
      />
      <Route
        path="/expenses"
        element={
          <ProtectedRoute
            component={ExpensePage}
            isAuthenticated={isAuthenticated}
            redirectTo="/login"
          />
        }
      />
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  );
};

export default AppRoutes;
