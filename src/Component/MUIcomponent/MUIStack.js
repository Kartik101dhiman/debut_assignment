import { Stack } from "@mui/material";
import React from "react";

const MUIStack = (props) => {
  const { children, ...rest } = props;
  return <Stack {...rest}>{children}</Stack>;
};

export default MUIStack;
