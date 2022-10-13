import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  first_name: Yup.string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .required("Required"),
  last_name: Yup.string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(8, "Invalid phone number")
    .max(14, "Invalid phone number")
    .required("Required"),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export const EditPersonalSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .required("Required"),
  last_name: Yup.string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(8, "Invalid phone number")
    .max(14, "Invalid phone number")
    .required("Required"),
});
