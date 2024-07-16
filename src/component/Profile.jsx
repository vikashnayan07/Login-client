import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { signUpValidation } from "../helper/validate";
import { useState } from "react";
import convertToBase from "../helper/convert";

export default function Profile() {
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
        <div className={styles.glass} style={{ width: "20%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Signup User</h4>
            <span className="py-4 text-xl w-fit text-center text-gray-500">
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
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  className={styles.textbox}
                  type="text"
                  placeholder="firstname"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  className={styles.textbox}
                  type="text"
                  placeholder="lastname"
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("email")}
                  className={styles.textbox}
                  type="text"
                  placeholder="email"
                />
                <input
                  {...formik.getFieldProps("mobile")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Mobile"
                />
              </div>
              <input
                {...formik.getFieldProps("address")}
                className={styles.textbox}
                type="text"
                placeholder="Enter your address"
              />

              <button className={styles.btn} type="submit">
                Signup
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back again?{" "}
                <button className="text-red-500">Logout</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
