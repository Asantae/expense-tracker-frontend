import React from "react";
import Typography from "@mui/material/Typography";

interface TableDescriptionProps {
  text: string;
  maxWidth?: number | string;
}

const TableDescription: React.FC<TableDescriptionProps> = ({
  text,
  maxWidth = 200,
}) => {
  return (
    <Typography
      noWrap
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: maxWidth,
      }}
    >
      {text}
    </Typography>
  );
};

export default TableDescription;