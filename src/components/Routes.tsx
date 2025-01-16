import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from '../pages/CategoryPage';
import ExpensePage from '../pages/ExpensePage';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Dashboard from './Dashboard';
import NotFound from '../pages/NotFound';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AppRoutes: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const isAuthenticated = Boolean(token);
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
