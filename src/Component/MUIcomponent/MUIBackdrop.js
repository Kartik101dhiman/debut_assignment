import { Backdrop } from "@mui/material";
import React from "react";

const MUIBackdrop = (props) => {
  const { children, ...rest } = props;
  return <Backdrop {...rest}>{children}</Backdrop>;
};

export default MUIBackdrop;
