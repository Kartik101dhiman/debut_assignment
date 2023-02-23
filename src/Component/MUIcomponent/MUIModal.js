import React from "react";
import { Modal } from "@mui/material";

const MUIModal = (props) => {
  const { children, ...rest } = props;
  return <Modal {...rest}>{children}</Modal>;
};

export default MUIModal;
