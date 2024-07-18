import { Navigate } from "react-router-dom";
import useAuthStore from "../store/store";

export const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export const ProtectPasswordRoute = ({ children }) => {
  const username = useAuthStore.getState().auth.username;
  if (!username) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};
