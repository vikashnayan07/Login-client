import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { signUpValidation } from "../helper/validate";
import { useState } from "react";
import convertToBase from "../helper/convert";

export default function Password() {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      username: "vikash",
      email: "vikashnayan@gmail.com",
      password: "Vikash94304@",
    },
    validate: signUpValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  const handleUpload = async (e) => {
    try {
      const base64 = await convertToBase(e.target.files[0]);
      setFile(base64);
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex justify-center items-center h-fit py-5">
        <div className={styles.glass} style={{ width: "35%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Signup User</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to connect you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={
                    file ||
                    "https://avatars.githubusercontent.com/u/115102517?s=400&u=53c0465f218c35139b958f1f1f99934e4f7a3f67&v=4"
                  }
                  className={styles.profile_img}
                  alt="avatar"
                />
                <input
                  onChange={handleUpload}
                  type="file"
                  name="profile"
                  id="profile"
                />
              </label>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Enter your username"
              />
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Enter email"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Enter password"
              />
              <button className={styles.btn} type="submit">
                Signup
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already have an account?{" "}
                <Link className="text-red-500" to="/signup">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
