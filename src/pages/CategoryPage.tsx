import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import { loadCategories } from '../actions/categoryActions';

interface ICategory {
  id: string;
  name: string;
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await loadCategories();
      setCategories(categoriesData);
    };
    getCategories();
  }, []);

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