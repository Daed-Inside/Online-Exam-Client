import React, { useState, useEffect } from "react";
import "./personal.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormikError } from "../../components/FormikError/FormikError.js";
import { EditPersonalSchema } from "../../constants/validation";
import ApiStatusDialog from "../../components/dialog/dialog.js";
import { Link } from "react-router-dom";
import { handleApi } from "../../components/utils/utils";
import constant from "../../constants/constant";
import axios from "axios";

function fetchInfo(setFomData) {
  axios
    .get(`${constant.BASEURL}/core/user/detail`, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
    })
    .then((res) => {
      handleApi(res, (e) => {
        setFomData(res.data.data);
      });
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        alert(error);
      }, 400);
    });
}

function handleEdit(reqBody, setDialogObj) {
  axios
    .put(`${constant.BASEURL}/core/user/detail`, reqBody, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
    })
    .then((res) => {
      handleApi(res, (e) => {
        setDialogObj({
          open: true,
          msg: res.data.message,
          status: 1,
        });
        setTimeout(() => {
          setDialogObj({
            open: false,
            msg: res.data.message,
            status: 1,
          });
        }, 2000);
      });
    })
    .catch((error) => {
      setDialogObj({
        open: true,
        msg: "System error",
        status: 2,
      });
      setTimeout(() => {
        setDialogObj({
          open: false,
          msg: "System error",
          status: 2,
        });
      }, 2000);
    });
}

export default function Personal(props) {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
  });

  const [dialogObj, setDialogObj] = useState({
    open: false,
    msg: "OK",
    status: 1,
  });

  useEffect(() => {
    fetchInfo(setFormData);
  }, []);

  return (
    <>
      <div className="personal-layout">
        <div className="personal-left-section">
          <img
            src={"file://D:/Study/Final/online-exam-py/core/media/Avatar.jpg"}
            id="avatar"
          />
        </div>
        <div className="personal-right-section">
          <div className="personal-right-body">
            <div className="personal-title">
              <h2 style={{ textAlign: "center" }}>Information</h2>
            </div>
            <div className="personal-body">
              <Formik
                initialValues={{
                  email: formData.email,
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  phone: formData.phone,
                  address: formData.address,
                }}
                enableReinitialize={true}
                validationSchema={EditPersonalSchema}
                onSubmit={(values, { setSubmitting }) => {
                  handleEdit(values, setDialogObj);
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <Form className="info-form">
                    <div className="input-section">
                      <p className="blacked-text">Email</p>
                      <div style={{ flex: 1 }}>
                        <Field
                          className="login-input"
                          type="email"
                          name="email"
                          placeholder="Email"
                          disabled={true}
                        />
                      </div>
                    </div>
                    {/* <ErrorMessage name="email" component="div" /> */}
                    <div className="input-section">
                      <p className="blacked-text">First name</p>
                      <div style={{ flex: 1 }}>
                        <Field
                          className="login-input"
                          type="text"
                          name="first_name"
                        />
                        {errors.first_name ? (
                          FormikError(errors, "first_name")
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                    <div className="input-section">
                      <p className="blacked-text">Last name</p>
                      <div style={{ flex: 1 }}>
                        <Field
                          className="login-input"
                          type="text"
                          name="last_name"
                        />
                        {errors.last_name ? (
                          FormikError(errors, "last_name")
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                    <div className="input-section">
                      <p className="blacked-text">Phone</p>
                      <div style={{ flex: 1 }}>
                        <Field
                          className="login-input"
                          type="text"
                          name="phone"
                        />
                        {errors.phone ? FormikError(errors, "phone") : <div />}
                      </div>
                    </div>
                    <div className="input-section">
                      <p className="blacked-text">Address</p>
                      <div style={{ flex: 1 }}>
                        <Field
                          className="login-input"
                          type="text"
                          name="address"
                        />
                        {errors.address ? (
                          FormikError(errors, "address")
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                    <div className="input-section justify_center">
                      <button className="update-button" type="submit">
                        Update
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ApiStatusDialog
        msg={dialogObj.msg}
        open={dialogObj.open}
        status={dialogObj.status}
      />
    </>
  );
}
