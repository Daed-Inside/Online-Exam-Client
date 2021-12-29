import "./signup.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import ImageStudy from "../../assets/images/login_test_image.png";
import { SignUpSchema } from "../../constants/validation";
import { FormikError } from "../../components/FormikError/FormikError.js";

function SignUp() {
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
            <p className="signup-heading">signup</p>
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPass: "",
                phone: "",
                address: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
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
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    {errors.password ? (
                      FormikError(errors, "password")
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="input-section">
                    <Field
                      className="signup-input"
                      type="password"
                      name="confirmPass"
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPass ? (
                      FormikError(errors, "confirmPass")
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
                  {/* <ErrorMessage name="password" component="div" /> */}
                  <button
                    className="signup-button"
                    type="submit"
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
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
    </>
  );
}

export default SignUp;
