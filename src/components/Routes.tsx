import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from '../pages/CategoryPage';
import ExpensePage from '../pages/ExpensePage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoryPage />} />
      <Route path="/expenses" element={<ExpensePage />} />
    </Routes>
  );
};

export default AppRoutes;
