import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CategoryDropdown from './CategoryDropdown';
import { loadFrequencies } from '../actions/loadFrequenciesAction';
import { Frequency } from '../interfaces/Frequency';

interface AddExpenseFormProps {
  onSubmit: (data: { amount: number; description: string; categoryId: string; frequency: number }) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ amount, description, categoryId, frequency: selectedFrequency });
  };

  useEffect(() => {
    const getFrequencies = async () => {
      const frequenciesData = await loadFrequencies();
      setFrequencies(frequenciesData);
      if (frequenciesData.length > 0) {
        setSelectedFrequency(frequenciesData[0].id); // Set the first frequency as default
      }
    };
    getFrequencies();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
        <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
        />
        <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <CategoryDropdown onCategorySelect={setCategoryId}/>
        <FormControl fullWidth>
        <InputLabel id="frequency-select-label">Frequency</InputLabel>
        <Select
          labelId="frequency-select-label"
          value={selectedFrequency}
          onChange={(e) => setSelectedFrequency(Number(e.target.value))}
          label="Frequency"
          displayEmpty
        >
          {frequencies.map((frequency) => (
            <MenuItem key={frequency.id} value={frequency.id}>
              {frequency.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Expense
        </Button>
    </form>
  );
};

export default AddExpenseForm;