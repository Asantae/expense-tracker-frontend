import React from "react";
import { Checkbox } from "@mui/material";

interface Props {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const ExpenseTableCheckbox: React.FC<Props> = ({ checked, indeterminate, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    event.stopPropagation();
    onChange(event, checked);
  };

  return (
    <Checkbox
      checked={checked}
      indeterminate={indeterminate}
      onChange={handleChange}
      onClick={(event) => event.stopPropagation()}
    />
  );
};

export default ExpenseTableCheckbox;