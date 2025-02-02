import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, FormHelperText } from "@mui/material";
import { enumToValueArray, getFrequencyDisplayValue } from "../utils/enumUtil";
import { Frequency } from "../interfaces/FrequencyEnum";

interface FrequencyDropdownProps {
  onFrequencySelect: (frequency: string) => void;
  isLoading: boolean;
  error: boolean;
  helperText: string;
}

const FrequencyDropdown: React.FC<FrequencyDropdownProps> = ({ onFrequencySelect, isLoading, error, helperText }) => {
  const frequencyOptions = enumToValueArray(Frequency);
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>();

  const handleFrequencyChange = (e: SelectChangeEvent<string>) => {
    const frequency = e.target.value;
    setSelectedFrequency(frequency as Frequency);
    onFrequencySelect(frequency);
  };

  return (
    <Box>
      <FormControl fullWidth error={error} sx={{ mb: 2 }}>
        <InputLabel id="frequency-select-label">Frequency</InputLabel>
        <Select
          labelId="frequency-select-label"
          label="Frequency"
          id="frequency-select"
          value={selectedFrequency}
          onChange={handleFrequencyChange}
          disabled={isLoading}
        >
          {frequencyOptions.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {getFrequencyDisplayValue(option.value)}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default FrequencyDropdown;