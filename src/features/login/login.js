import './login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import ImageStudy from "../../assets/images/login_test_image.png";

function Login(){
    return (
        <>
            <div className="login-layout">
                <div className="login-background_left"></div>
                <div className="login-background_right"></div>
                <div className="login-panel">
                    <div className='login-panel_left'>
                        <img alt='imagestudy' src={ImageStudy}  />
                    </div>
                    <div className='login-panel_right'>
                        <p className='login-heading'>Login</p>
                         <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                errors.email = 'Required';
                                } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                                }, 400);
                            }}
                            >
                            {({ isSubmitting }) => (
                                <Form className='login-form'>
                                    <Field className="login-input" type="email" name="email" placeholder="Email" />
                                    {/* <ErrorMessage name="email" component="div" /> */}
                                    <Field type="password" name="password" placeholder="Password"/>
                                    <Link className="login-forgot_pass" to="">Forgot password?</Link>
                                     <label className='login-remmber_me'>
                                        <Field type="checkbox" name="checked" value="remember" />
                                            Remember me
                                    </label>
                                    {/* <ErrorMessage name="password" component="div" /> */}
                                    <button className="login-button" type="submit" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                    <p className='login-content'>Don't have account?  <Link className="login-forgot_pass" to="">Sign up</Link></p>
                                </Form>
                            )}
                            </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;