import { ErrorMessage, Field } from "formik";
import React from "react";
import Texterror from "./Texterror";

const Checkboxtype = (props) => {
  const { label, name, option, ...rest } = props;
  return (
    <div className="mb-4">
      <label className="fw-bold d-block">{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return option.map((option) => {
            return (
              <>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value} className="me-2">
                  {option.key}
                </label>
              </>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={Texterror} />
    </div>
  );
};

export default Checkboxtype;
