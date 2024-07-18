import { useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";

import toast, { Toaster } from "react-hot-toast";
import useAuthStore from "../store/store";
import { useEffect, useState } from "react";
import { generateOTP, verifyOTP } from "../helper/helper";

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) {
        return toast.success("OTP has been sent to your email");
      }
      return toast.error("Could not generate OTP");
    });
  }, [username]);

  async function onSubmitReset(e) {
    e.preventDefault();

    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verify Successfully...", {
          duration: 1500, // Display toast for 2 seconds
        });

        // Delay the navigation by 2 seconds to match the toast duration
        setTimeout(() => {
          navigate("/reset");
        }, 1500);
      }
    } catch (error) {
      toast.error("Wrong OTP! Try again!...");
    }
  }

  // Resend OTP
  function resendOTP() {
    let resendPromise = generateOTP(username);
    toast.promise(resendPromise, {
      loading: "Sending...",
      success: <b>OTP has been sent again to email</b>,
      error: <b>Couldn't send OTP</b>,
    });
    resendPromise.then((OTP) => {
      console.log(OTP);
    });
  }

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex justify-center items-center h-full py-5">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to reset password
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmitReset}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="text-gray-500 text-sm mb-6">
                  Enter 6 digit OTP sent to your email address
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className={`${styles.textbox} mt-2`}
                  type="text"
                  placeholder="OTP"
                />
              </div>

              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className="text-gray-500">
              Can't get ?{" "}
              <button onClick={resendOTP} className="text-red-500">
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
