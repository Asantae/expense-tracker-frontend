import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import { loadCategories } from '../actions/loadCategoriesActions';
import { Category } from '../../interfaces/Category';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';

const CategoryPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await loadCategories(dispatch);
      setCategories(categoriesData);
    };
    getCategories();
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <List>
        {categories && categories.map((category) => (
          <ListItem key={category.id}>{category.name}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CategoryPage;