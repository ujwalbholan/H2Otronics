import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import isTokenValid from "../Utils/validToken";

const PublicRoute = ({ children }) => {
  const token = Cookies.get("authToken");

  const authorized = token && isTokenValid(token);

  // If token exists → user is logged in → redirect to dashboard
  if (authorized) {
    return <Navigate to="/dashboard" replace />;
  }

  // If no token → user not logged in → allow access
  return children;
};

export default PublicRoute;
