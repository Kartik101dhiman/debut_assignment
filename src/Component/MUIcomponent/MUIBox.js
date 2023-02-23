import { Box } from "@mui/system";
import React from "react";

const MUIBox = (props) => {
  const { children, className, ...rest } = props;
  return (
    <Box className={className} {...rest}>
      {children}
    </Box>
  );
};

export default MUIBox;
