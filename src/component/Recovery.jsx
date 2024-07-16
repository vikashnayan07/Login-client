import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";

import { Toaster } from "react-hot-toast";

export default function Recovery() {
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

          <form className="pt-20">
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="text-gray-500 text-sm mb-6 ">
                  Enter 6 digit OTP sent to your email address
                </span>
                <input
                  className={`${styles.textbox} mt-2`}
                  type="text"
                  placeholder="OTP"
                />
              </div>

              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get ? <button className="text-red-500">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
