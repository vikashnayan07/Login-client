import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Password.module.css";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { profileValidation } from "../helper/validate";
import { useState } from "react";
import convertToBase from "../helper/convert";
import useFetchData from "../hooks/fetch.hook";
import { updateUserProfile } from "../helper/helper";

export default function Profile() {
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const [{ isLoading, apiData, serverError }] = useFetchData();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let profileUpdate = updateUserProfile(values);
      toast.promise(profileUpdate, {
        loading: "Updating...",
        success: <b>Update Successfully...</b>,
        error: <b>Could not Update...</b>,
      });
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

  //remove token
  function useLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex justify-center items-center h-fit py-5">
        <div className={styles.glass} style={{ width: "35%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">User Profile</h4>
            <span className="py-4 text-xl w-fit text-center text-gray-500">
              you can update profile here!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={
                    apiData?.profile ||
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
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back again?{" "}
                <button onClick={useLogout} className="text-red-500">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
