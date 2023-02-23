import { ErrorMessage, Field } from "formik";
import React from "react";
import Texterror from "./Texterror";

const Selecttype = (props) => {
  const { name, option, ...rest } = props;
  return (
    <div className="mb-4">
      <Field as="select" name={name} id={name} {...rest}>
        s
        {option.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={Texterror} />
    </div>
  );
};

export default Selecttype;
