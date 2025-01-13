import React, { useEffect, useState } from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { loadCategories } from '../actions/categoryActions';
import { showErrorToast } from '../utils/toastUtil';  // Importing the utility

interface Category {
  id: number;
  name: string;
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await loadCategories();
        setCategories(categoriesData);
      } catch (err) {
      }
    };
    getCategories();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id}>{category.name}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryPage;