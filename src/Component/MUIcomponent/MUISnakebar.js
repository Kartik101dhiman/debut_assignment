import { Snackbar } from "@mui/material";
import React from "react";

const MUISnakebar = (props) => {
  const { children, ...rest } = props;
  return <Snackbar {...rest}>{children}</Snackbar>;
};

export default MUISnakebar;
