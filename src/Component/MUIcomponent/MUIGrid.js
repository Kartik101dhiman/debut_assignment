import React from "react";
import { Grid } from "@mui/material";

const MUIGrid = (props) => {
  const { type, size, children, ...rest } = props;
  return (
    <Grid type md={size} {...rest}>
      {children}
    </Grid>
  );
};

export default MUIGrid;
