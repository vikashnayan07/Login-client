import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { resetPasswordValidate } from "../helper/validate";

export default function Reset() {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex justify-center items-center h-full py-5">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">New Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password
            </span>
          </div>

          <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password"
              />
              <input
                {...formik.getFieldProps("confirmPassword")}
                className={styles.textbox}
                type="text"
                placeholder="Confirm password"
              />
              <button className={styles.btn} type="submit">
                Sumbit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
