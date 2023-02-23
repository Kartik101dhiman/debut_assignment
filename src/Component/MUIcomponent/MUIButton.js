import React from "react";
import { Button } from "@mui/material";

const MUIButton = (props) => {
  const { children, variant, ...rest } = props;
  return (
    <Button variant={variant} {...rest}>
      {children}
    </Button>
  );
};

export default MUIButton;
