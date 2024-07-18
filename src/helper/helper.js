import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = "http://localhost:3000";

// Function to get the username from the token
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Couldn't find token");
  const decoded = jwtDecode(token);
  return decoded.username;
}

export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username not found" };
  }
}

export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password not match!!" };
  }
}

export async function registerUser(credential) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/register", credential);
    let { username, email } = credential;

    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function verifyPassword({ username, password }) {
  try {
    const { data } = await axios.post("/api/login", { username, password });
    const { token } = data;

    // Store the token in localStorage
    localStorage.setItem("token", token);

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Incorrect Password" });
  }
}

export async function updateUserProfile(response) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.put("/api/updateprofile", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Can't Update the records.." });
  }
}

export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });

    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your password recovery otp is ${code}. Verify and reset your password`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "DO NOT REPLY - Recovery OTP",
      });
      return Promise.resolve(code);
    }
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject({ error: "Incorrect Password" });
  }
}

export async function resetPassword({ username, password }) {
  try {
    const response = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    console.log("API Response:", response); // Log the full response for debugging

    if (response.status === 200) {
      return response.data; // Return the data on success
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error(
      "API Error:",
      error.response ? error.response.data : error.message
    );
    return Promise.reject({
      error:
        error.response?.data?.error || error.message || "An error occurred",
    });
  }
}
