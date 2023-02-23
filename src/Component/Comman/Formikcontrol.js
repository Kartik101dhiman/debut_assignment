import React from "react";
import Checkboxtype from "./Checkboxtype";
import Inputtype from "./Inputtype";
import Radiotype from "./Radiotype";
import Selecttype from "./Selecttype";

const Formikcontrol = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Inputtype type={control} {...rest} />;
    case "select":
      return <Selecttype {...rest} />;
    case "radio":
      return <Radiotype {...rest} />;
    case "checkbox":
      return <Checkboxtype {...rest} />;
    default:
      return null;
  }
};

export default Formikcontrol;
