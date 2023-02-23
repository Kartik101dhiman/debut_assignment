import React, { forwardRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Formikcontrol from "../Component/Comman/Formikcontrol";
import MUIBox from "../Component/MUIcomponent/MUIBox";
import MUITypography from "../Component/MUIcomponent/MUITypography";
import MUIButton from "../Component/MUIcomponent/MUIButton";
import { emailRegex, nameRegex } from "../Regex";
import LocalStorageService from "../Services/Localstorage";
import { Link, useNavigate } from "react-router-dom";
import Apiservices from "../Services/Apiservices";
import { Stack, Snackbar } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [load, setLoader] = useState(false);
  const [snake, SetSnake] = useState({
    severity: "error",
    message: "Data not found",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();

  const cityoption = [
    { key: "Select your city", value: "" },
    { key: "jagadhri", value: "jagadhri" },
    { key: "chandigarh", value: "chandigarh" },
    { key: "delhi", value: "delhi" },
  ];

  const genderoption = [
    { key: "male", value: "male" },
    { key: "female", value: "female" },
    { key: "other", value: "other" },
  ];

  const qualificationoption = [
    { key: "10th", value: "10th" },
    { key: "12th", value: "12th" },
    { key: "UG", value: "UG" },
    { key: "PG", value: "PG" },
  ];

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "eve.holt@reqres.in",
    password: "pistol",
    confirmpassword: "pistol",
    city: "",
    gender: "",
    qualification: [],
  };

  const onSubmit = async (values) => {
    try {
      const url = "https://reqres.in/api/register";
      setLoader(true);
      let token = await Apiservices.PostData(url, values);
      LocalStorageService.setToken(token.data.token);
      SetSnake({ severity: "success", message: "Successful" });
      setLoader(false);
      setOpen(true);
      navigate("/dashboard");
    } catch (error) {
      setLoader(false);
      setOpen(true);
    }
  };

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .matches(nameRegex, "Invalid first name")
      .required("Required!"),

    lastname: Yup.string()
      .matches(nameRegex, "Invalid last name")
      .required("Required!"),

    email: Yup.string()
      .matches(emailRegex, "Invalid email")
      .required("Required!"),

    password: Yup.string().required("Required!"),

    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required(),

    city: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    qualification: Yup.array().min(1, "Required").required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(Formik) => {
        return (
          <MUIBox className="formcontainer">
            <MUITypography variant="h4" className="heading">
              {t("Register")}
            </MUITypography>
            <Form className="formm">
              <Formikcontrol
                control="input"
                type="text"
                placeholder="First name"
                name="firstname"
                className="form-control"
              />

              <Formikcontrol
                control="input"
                type="text"
                placeholder="Last name"
                name="lastname"
                className="form-control"
              />

              <Formikcontrol
                control="input"
                type="email"
                placeholder="Email"
                name="email"
                className="form-control"
              />

              <Formikcontrol
                control="input"
                type="password"
                placeholder="Password"
                name="password"
                className="form-control"
              />

              <Formikcontrol
                control="input"
                type="password"
                placeholder="Confirm password"
                name="confirmpassword"
                className="form-control"
              />

              <Formikcontrol
                control="select"
                name="city"
                className="form-control"
                option={cityoption}
              />

              <Formikcontrol
                control="radio"
                label="Gender"
                name="gender"
                option={genderoption}
              />

              <Formikcontrol
                control="checkbox"
                label="Qualification"
                name="qualification"
                option={qualificationoption}
              />

              <MUIBox className="formfooter">
                <MUIBox>
                  <MUIButton
                    type="submit"
                    variant="contained"
                    color="success"
                    className="me-3"
                    onSubmit={onSubmit}
                  >
                    {t("Register")}
                  </MUIButton>
                  <MUIButton type="reset" variant="contained" color="error">
                    {t("Reset")}
                  </MUIButton>
                </MUIBox>
                <MUITypography className="formlink">
                  <Link to="/">{t("Login")}</Link>
                </MUITypography>
              </MUIBox>
            </Form>
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity={snake.severity}
                  sx={{ width: "100%" }}
                >
                  {snake.message}
                </Alert>
              </Snackbar>
            </Stack>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={load}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </MUIBox>
        );
      }}
    </Formik>
  );
};

export default Register;
