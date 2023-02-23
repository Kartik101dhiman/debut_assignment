import React from "react";
import { Field, ErrorMessage } from "formik";
import Texterror from "./Texterror";

const Inputtype = (props) => {
  const { name, ...rest } = props;
  return (
    <div className="mb-4">
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={Texterror} />
    </div>
  );
};

export default Inputtype;
