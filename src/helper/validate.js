import toast from "react-hot-toast";
import { authenticate } from "./helper";

export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  if (values.username) {
    const { status } = await authenticate(values.username);
    if (status !== 200) {
      errors.exist = toast.error("Username not found..");
    }
  }

  return errors;
}
export async function resetPasswordValidate(values) {
  const err = passwordVerify({}, values);
  if (values.password !== values.confirmPassword) {
    err.exist = toast.error("Password not match..");
  }
  return err;
}

export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

export async function signUpValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
  return errors;
}
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

function passwordVerify(error = {}, values) {
  const passwordRegex = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$"
  );

  if (!values.password) {
    error.password = toast.error("Password Required..");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password..");
  } else if (values.password.length < 6) {
    error.password = toast.error("Password must be more than 6 char..");
  } else if (!passwordRegex.test(values.password)) {
    error.password = toast.error(
      "Password must contains a upper case , a lower case , a digit and a special char.."
    );
  }
  return error;
}
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required..");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username..");
  }
  return error;
}
function emailVerify(error = {}, values) {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9_+&*-]+(?:\\." +
      "[a-zA-Z0-9_+&*-]+)*@" +
      "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
      "A-Z]{2,7}$"
  );
  if (!values.email) {
    error.email = toast.error("Email Required");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email");
  } else if (!emailRegex.test(values.email)) {
    error.email = toast.error("Invalid email");
  }
  return error;
}
