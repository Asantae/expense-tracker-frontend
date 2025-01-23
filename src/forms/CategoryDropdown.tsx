import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { loadCategories } from '../actions/loadCategoriesActions';
import { Category } from '../interfaces/Category';
import { addCategoryAction } from '../actions/addCategoryAction';

const CategoryDropdown = ({ onCategorySelect }: { onCategorySelect: (categoryId: string) => void }) => {
  const dispatch: AppDispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const categoryId = e.target.value;
    if (categoryId === 'add-new') {
      setIsDialogOpen(true);
    } else {
      setSelectedCategory(categoryId);
      onCategorySelect(categoryId);
    }
  };

  // Add new category
  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      const newCategoryObject: Category = {
        id: '',
        name: newCategory,
        isDefault: false,
        createdBy: '',
      };
      await dispatch(addCategoryAction(newCategoryObject))

      setCategories((prevCategories) => [...prevCategories, newCategoryObject]);
      setSelectedCategory(newCategoryObject.id); 
      onCategorySelect(newCategoryObject.id);
      setNewCategory('');
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await loadCategories(dispatch);
      setCategories(categoriesData);
    };
    getCategories();
  }, [dispatch]);

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
          <MenuItem value="add-new" style={{ fontStyle: 'italic', color: '#1976d2' }}>
            Add New Category
          </MenuItem>
        </Select>
      </FormControl>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitCategory} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryDropdown;