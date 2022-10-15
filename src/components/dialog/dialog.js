import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormikError } from "../../components/FormikError/FormikError.js";
import { ChangePassValidate } from "../../constants/validation";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import MoodBadOutlinedIcon from "@mui/icons-material/MoodBadOutlined";
import Button from "@mui/material/Button";
import { handleApi } from "../../components/utils/utils";
import constant from "../../constants/constant";
import axios from "axios";
import "./dialog.css";

function handleChangePass(reqBody, setOpen, setDialogObj) {
  axios
    .post(`${constant.BASEURL}/core/user/change-password`, reqBody, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
    })
    .then((res) => {
      handleApi(res, (e) => {
        if (res.data.code == 1) {
          localStorage.setItem(
            constant.localStorage.TOKEN,
            res.data.data.access
          );
        }
        setDialogObj({
          open: true,
          msg: res.data.message,
          status: res.data.code,
        });
        setTimeout(async () => {
          await setDialogObj({
            open: false,
            msg: res.data.message,
            status: res.data.code,
          });
          setOpen(false);
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

function ApiStatusDialog({ children, ...props }) {
  const { msg, open, status } = props;
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          {status === 1 ? (
            <div style={{ textAlign: "center" }}>
              <CheckCircleOutlineIcon
                sx={{ fontSize: 100 }}
                className="icon"
                color="success"
              />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <CancelOutlinedIcon
                sx={{ fontSize: 100, color: "red" }}
                className="icon"
              />
            </div>
          )}
          <DialogTitle sx={{ fontSize: "20px", textAlign: "center" }}>
            {msg}
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function SubmitDialog({ children, ...props }) {
  const { msg, open, status, score } = props;
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          {status === 2 ? (
            <div style={{ textAlign: "center" }}>
              <SentimentVerySatisfiedOutlinedIcon
                sx={{ fontSize: 100 }}
                className="icon"
                color="success"
              />
            </div>
          ) : status === 1 ? (
            <div style={{ textAlign: "center" }}>
              <MoodBadOutlinedIcon
                sx={{ fontSize: 100, color: "red" }}
                className="icon"
              />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <CancelOutlinedIcon
                sx={{ fontSize: 100, color: "red" }}
                className="icon"
              />
            </div>
          )}
          <DialogTitle
            sx={{
              fontSize: "50px",
              textAlign: "center",
              color: status === 2 ? "green" : "red",
            }}
          >
            {score} Points
          </DialogTitle>
          <DialogTitle sx={{ fontSize: "20px", textAlign: "center" }}>
            {msg}
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function ChangePassDialog({ children, ...props }) {
  const { open, setOpen } = props;
  const [dialogObj, setDialogObj] = useState({
    open: false,
    msg: "OK",
    status: 1,
  });
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        fullWidth={true}
        maxWidth={"md"}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontSize: "20px", textAlign: "center" }}>
          {"CHANGE PASSWORD"}
        </DialogTitle>
        <div>
          <Formik
            initialValues={{
              old_password: "",
              password: "",
              confirm_password: "",
            }}
            enableReinitialize={true}
            validationSchema={ChangePassValidate}
            onSubmit={(values, { setSubmitting }) => {
              handleChangePass(values, setOpen, setDialogObj);
            }}
          >
            {({
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              resetForm,
              errors,
              touched,
            }) => (
              <Form className="login-form">
                <div className="input-section">
                  <Field
                    className="login-input dialog-input"
                    type="password"
                    name="old_password"
                    placeholder="Current password"
                  />
                  {errors.old_password && touched.email ? (
                    FormikError(errors, "old_password")
                  ) : (
                    <div />
                  )}
                </div>
                <div className="input-section">
                  <Field
                    className="login-input dialog-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  {errors.password && touched.password ? (
                    FormikError(errors, "password")
                  ) : (
                    <div />
                  )}
                </div>
                <div className="input-section">
                  <Field
                    className="login-input dialog-input"
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    FormikError(errors, "confirm_password")
                  ) : (
                    <div />
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      flex: 1,
                      marginBottom: "10px",
                      marginRight: "5px",
                    }}
                  >
                    <Button
                      sx={{ width: "100%" }}
                      variant="contained"
                      onClick={async () => {
                        resetForm();
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      marginBottom: "10px",
                    }}
                  >
                    <Button
                      sx={{ width: "100%" }}
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <ApiStatusDialog
          msg={dialogObj.msg}
          open={dialogObj.open}
          status={dialogObj.status}
        />
      </Dialog>
    </div>
  );
}

export default ApiStatusDialog;
