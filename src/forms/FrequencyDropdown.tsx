import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box } from "@mui/material";
import { enumToValueArray } from "../utils/enumToValueArray";
import { Frequency } from "../interfaces/FrequencyEnum";

interface FrequencyDropdownProps {
  onFrequencySelect: (frequency: string) => void;
}

const FrequencyDropdown: React.FC<FrequencyDropdownProps> = ({ onFrequencySelect }) => {
  const frequencyOptions = enumToValueArray(Frequency);
  const [selectedFrequency, setSelectedFrequency] = useState<string>("");

  const handleFrequencyChange = (e: SelectChangeEvent<string>) => {
    const frequency = e.target.value;
    setSelectedFrequency(frequency);
    onFrequencySelect(frequency);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="frequency-select-label">Frequency</InputLabel>
        <Select
          labelId="frequency-select-label"
          value={selectedFrequency}
          onChange={handleFrequencyChange}
          displayEmpty
        >
          {frequencyOptions.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FrequencyDropdown;
