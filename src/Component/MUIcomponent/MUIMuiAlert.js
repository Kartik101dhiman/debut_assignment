import React from "react";
import MuiAlert from "@mui/material/Alert";

const MUIMuiAlert = (props) => {
  const { children, ...rest } = props;
  return <MuiAlert {...rest}>{children}</MuiAlert>;
};

export default MUIMuiAlert;
