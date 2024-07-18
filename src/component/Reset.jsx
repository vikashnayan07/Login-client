import { useFormik } from "formik";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { resetPasswordValidate } from "../helper/validate";
import { resetPassword } from "../helper/helper";
import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/fetch.hook";
import { useEffect } from "react";

export default function Reset() {
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] =
    useFetchData("createResetsession");

  useEffect(() => {
    if (serverError) {
      console.error("Server Error in Reset Component:", serverError);
    }
  }, [serverError]);

  const formik = useFormik({
    initialValues: {
      password: "Testpassword9@",
      confirmPassword: "Testpassword9@",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPasswordPromise = resetPassword({
        username: apiData?.username,
        password: values.password,
      });

      toast.promise(resetPasswordPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully</b>,
        error: <b>Couldn't Reset Password</b>,
      });

      resetPasswordPromise
        .then(() => {
          navigate("/password");
        })
        .catch((error) => {
          console.error("Error in Reset Password Promise:", error);
        });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status && status !== 201)
    return <Navigate to={"/password"} replace={true} />;

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
                type="password"
                placeholder="Password"
              />
              <input
                {...formik.getFieldProps("confirmPassword")}
                className={styles.textbox}
                type="password"
                placeholder="Confirm password"
              />
              <button className={styles.btn} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
