import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ isLoading, children, ...props }) => {
  return (
    <Button {...props} disabled={isLoading || props.disabled}>
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default CustomButton;
