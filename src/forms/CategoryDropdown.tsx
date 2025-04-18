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
  FormHelperText,
} from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { loadCategories } from '../actions/loadCategoriesActions';
import { Category } from '../interfaces/Category';
import { addCategoryAction } from '../actions/addCategoryAction';
import { useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton';

interface CategoryDropdownProps {
  onCategorySelect: (categoryId: string) => void;
  isLoading: boolean;
  error: boolean;
  helperText: string;
  id?: string;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ onCategorySelect, isLoading, error, helperText, id }) => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.user.categoriesList || []);

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

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      const newCategoryObject: Category = {
        id: '',
        name: newCategory,
        isDefault: false,
        createdBy: '',
      };

      const result = await dispatch(addCategoryAction(newCategoryObject))

      if(result){
        setSelectedCategory(result.id); 
        onCategorySelect(result.id);
      }

      setNewCategory('');
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      await loadCategories(dispatch);
    };
    getCategories();
  }, [dispatch]);

  return (
    <Box>
      <FormControl fullWidth error={error} sx={{ mb: 2 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          label="Category"
          value={id ?? selectedCategory}
          onChange={handleCategoryChange}
          disabled={isLoading}
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
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 1 }}
            label="Category Name"
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => setIsDialogOpen(false)} color="secondary" disabled={isLoading}>
            Cancel
          </CustomButton>
          <CustomButton onClick={handleSubmitCategory} color="primary" variant="contained" disabled={isLoading}>
            Add
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryDropdown;