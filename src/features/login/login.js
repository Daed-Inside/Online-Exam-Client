import "./login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import ImageStudy from "../../assets/images/login_test_image.png";
import { FormikError } from "../../components/FormikError/FormikError.js";
import { SignInSchema } from "../../constants/validation";
import { handleApi } from "../../components/utils/utils";
import constant from "../../constants/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function handleSubmit(values, navigate) {
  const body = {
    email: values.email,
    password: values.password,
  };

  axios
    .post(`${constant.BASEURL}/core/login`, body)
    .then((res) => {
      handleApi(res, (e) => {
        //localStorage.setItem(constant.localStorage.EMAIL, e.email);
        localStorage.setItem(constant.localStorage.TOKEN, e.access_token);
        navigate("/dashboard");
      });
      setTimeout(() => {
        alert("Login success");
      }, 400);
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        alert(error);
      }, 400);
    });
}

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-layout">
        <div className="login-background_left"></div>
        <div className="login-background_right"></div>
        <div className="login-panel">
          <div className="login-panel_left">
            <img alt="imagestudy" src={ImageStudy} />
          </div>
          <div className="login-panel_right">
            <p className="login-heading">Login</p>
            <Formik
              initialValues={{ email: "", password: "" }}
              enableReinitialize={true}
              validationSchema={SignInSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values, navigate);
                setSubmitting(false);
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
                <Form className="login-form">
                  <div className="input-section">
                    <Field
                      className="login-input"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    {errors.email && touched.email ? (
                      FormikError(errors, "email")
                    ) : (
                      <div />
                    )}
                  </div>
                  {/* <ErrorMessage name="email" component="div" /> */}
                  <div className="input-section">
                    <Field
                      className="login-input"
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
                  <Link className="login-forgot_pass" to="">
                    Forgot password?
                  </Link>
                  <label className="login-remmber_me">
                    <Field type="checkbox" name="checked" value="remember" />
                    Remember me
                  </label>
                  {/* <ErrorMessage name="password" component="div" /> */}
                  <button
                    className="login-button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <p className="login-content">
                    Don't have account?{" "}
                    <Link className="login-forgot_pass" to="/signup">
                      Sign up
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
