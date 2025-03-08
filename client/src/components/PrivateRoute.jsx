import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId"); // Vérifier aussi l'ID

  if (!userEmail || !userId) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

export default PrivateRoute;
