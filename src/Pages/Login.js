import React, { useState, forwardRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Formikcontrol from "../Component/Comman/Formikcontrol";
import MUIBox from "../Component/MUIcomponent/MUIBox";
import MUITypography from "../Component/MUIcomponent/MUITypography";
import MUIButton from "../Component/MUIcomponent/MUIButton";
import { Link } from "react-router-dom";
import { emailRegex } from "../Regex";
import Apiservices from "../Services/Apiservices";
import LocalStorageService from "../Services/Localstorage";
import { useNavigate } from "react-router-dom";
import MUISnakebar from "../Component/MUIcomponent/MUISnakebar";
import MUIStack from "../Component/MUIcomponent/MUIStack";
import CircularProgress from "@mui/material/CircularProgress";
import MUIMuiAlert from "../Component/MUIcomponent/MUIMuiAlert";
import MUIBackdrop from "../Component/MUIcomponent/MUIBackdrop";
import { useTranslation } from "react-i18next";

const Alert = forwardRef(function Alert(props, ref) {
  return <MUIMuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
  // const [snake, SetSnake] = useEffect();

  const initialValues = {
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(emailRegex, "Invalid email")
      .required("Required!"),
    password: Yup.string().required("Required!"),
  });

  const onSubmit = async (values) => {
    try {
      //Loader start
      setLoader(true);
      const url = "https://reqres.in/api/login";
      let token = await Apiservices.PostData(url, values);
      LocalStorageService.setToken(token.data.token);
      SetSnake({ severity: "success", message: "Successful" });
      setLoader(false);
      setOpen(true);
      navigate("/dashboard");
    } catch (error) {
      setOpen(true);
      setLoader(false);
    }
  };

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
              {t("Login")}
            </MUITypography>
            <Form className="formm">
              <Formikcontrol
                control="input"
                type="email"
                placeholder="Email"
                name="email"
                className="form-control"
              />
              <Formikcontrol
                control="input"
                type="text"
                placeholder="Password"
                name="password"
                className="form-control"
              />
              <MUIBox className="formfooter">
                <MUIBox>
                  <MUIButton
                    type="submit"
                    variant="contained"
                    color="success"
                    className="me-3"
                    onClick={() => onSubmit}
                  >
                    {t("Login")}
                  </MUIButton>
                  <MUIButton type="reset" variant="contained" color="error">
                    {t("Reset")}
                  </MUIButton>
                </MUIBox>
                <MUITypography className="formlink">
                  <Link to="/register">{t("Register")}</Link>
                </MUITypography>
              </MUIBox>
            </Form>
            <MUIStack spacing={2} sx={{ width: "100%" }}>
              <MUISnakebar
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
              </MUISnakebar>
            </MUIStack>
            <MUIBackdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={load}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </MUIBackdrop>
          </MUIBox>
        );
      }}
    </Formik>
  );
};

export default Login;

// <Stack spacing={2} sx={{ width: "100%" }}>
//   <Snackbar
//     open={false}
//     autoHideDuration={6000}
//     onClose={handleClose}
//   >
//     <Alert
//       onClose={handleClose}
//       severity="success"
//       sx={{ width: "100%" }}
//     >
//       This is a success message!
//     </Alert>
//   </Snackbar>
//   <Alert severity="success">This is a success message!</Alert>
// </Stack>
// <Backdrop
//   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//   open={load}
//   onClick={handleClose}
// >
//   <CircularProgress color="inherit" />
// </Backdrop>
