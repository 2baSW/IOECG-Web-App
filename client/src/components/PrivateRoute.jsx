import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const userEmail = sessionStorage.getItem("userEmail");
  const userId = sessionStorage.getItem("userId"); 

  if (!userEmail || !userId) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

export default PrivateRoute;
