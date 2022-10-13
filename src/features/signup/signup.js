import "./signup.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import ImageStudy from "../../assets/images/login_test_image.png";
import { SignUpSchema } from "../../constants/validation";
import { FormikError } from "../../components/FormikError/FormikError.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleApi } from "../../components/utils/utils";
import constant from "../../constants/constant";
import { showToast } from "../../components/toast/toast";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ApiStatusDialog from "../../components/dialog/dialog.js";
import React, { useEffect, useState } from "react";

function handleSubmit(values, navigate, setDialogObj) {
  const body = {
    email: values.email,
    phone: values.phone,
    address: values.address,
    first_name: values.first_name,
    last_name: values.last_name,
    role: values.role,
  };

  axios
    .post(`${constant.BASEURL}/core/user`, body)
    .then((res) => {
      handleApi(res, (e) => {
        if (res.data.code !== 1) {
          setDialogObj({
            open: true,
            msg: res.data.message,
            status: -1,
          });
          setTimeout(() => {
            setDialogObj({
              open: false,
              msg: res.data.message,
              status: -1,
            });
          }, 2000);
        } else {
          setDialogObj({
            open: true,
            msg: res.data.message,
            status: 1,
          });
          setTimeout(async () => {
            await setDialogObj({
              open: false,
              msg: res.data.message,
              status: 1,
            });
            navigate("/login");
          }, 2000);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function SignUp() {
  const navigate = useNavigate();
  const [dialogObj, setDialogObj] = useState({
    open: false,
    msg: "OK",
    status: 1,
  });
  return (
    <>
      <div className="signup-layout">
        <div className="signup-background_left"></div>
        <div className="signup-background_right"></div>
        <div className="signup-panel">
          <div className="signup-panel_left">
            <img alt="imagestudy" src={ImageStudy} />
          </div>
          <div className="signup-panel_right">
            <p className="signup-heading">SIGN UP</p>
            <Formik
              initialValues={{
                email: "",
                first_name: "",
                last_name: "",
                phone: "",
                address: "",
                role: 1,
              }}
              enableReinitialize={true}
              validationSchema={SignUpSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values, navigate, setDialogObj);
                setSubmitting(false);
                // console.log(values);
              }}
            >
              {({
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <Form className="signup-form">
                  <div className="input-section">
                    <Field
                      className="signup-input"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    {errors.email ? FormikError(errors, "email") : <div />}
                  </div>
                  {/* <ErrorMessage name="email" component="div" /> */}
                  <div className="input-section">
                    <Field
                      className="signup-input"
                      type="text"
                      name="first_name"
                      placeholder="First name"
                    />
                    {errors.first_name ? (
                      FormikError(errors, "first_name")
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="input-section">
                    <Field
                      className="signup-input"
                      type="text"
                      name="last_name"
                      placeholder="Last name"
                    />
                    {errors.last_name ? (
                      FormikError(errors, "last_name")
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="input-section">
                    <Field
                      className="signup-input"
                      type="text"
                      name="phone"
                      placeholder="Your phone number"
                    />
                    {errors.phone ? FormikError(errors, "phone") : <div />}
                  </div>
                  {/* <ErrorMessage name="phone" component="div" /> */}
                  <div className="input-section">
                    <Field
                      className="signup-input"
                      type="text"
                      name="address"
                      placeholder="Your address"
                    />
                  </div>
                  <div className="input-section">
                    <Select
                      labelId=""
                      id="role"
                      placeholder="Select role"
                      className="select-box"
                      value={values.role}
                      style={{ backgroundColor: "#fffff" }}
                      name="role"
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Student</MenuItem>
                      <MenuItem value={2}>Lecturer</MenuItem>
                    </Select>
                  </div>
                  {/* <ErrorMessage name="password" component="div" /> */}
                  <button
                    className="signup-button"
                    type="submit"
                    disabled={isSubmitting}
                    // onSubmit={handleSubmit}
                  >
                    Submit
                  </button>
                  <p className="signup-content">
                    Don't have account?{" "}
                    <Link className="signup-forgot_pass" to="/login">
                      Login
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <p>Sign up</p>
      <ApiStatusDialog
        msg={dialogObj.msg}
        open={dialogObj.open}
        status={dialogObj.status}
      />
    </>
  );
}

export default SignUp;
