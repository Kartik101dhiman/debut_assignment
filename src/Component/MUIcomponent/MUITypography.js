import React from "react";
import { Typography } from "@mui/material";

const MUITypography = (props) => {
  const { children, variant, ...rest } = props;
  return (
    <Typography variant={variant} {...rest}>
      {children}
    </Typography>
  );
};

export default MUITypography;
