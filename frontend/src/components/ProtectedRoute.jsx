import { Navigate } from "react-router-dom";
import Cookies from "js-cookie"; 
import isTokenValid from "../Utils/validToken";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("authToken"); 

  const authorized = token && isTokenValid(token);

  // If not authorized → redirect to login
  if (!authorized) {
    return <Navigate to="/signin" replace />;
  }

  // If authorized → render the protected content
  return children;
};

export default ProtectedRoute;
