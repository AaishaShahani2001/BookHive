import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = useSelector((state) => state.auth.role);

  // Wait until role loads
  if (role === null) return null;

  return role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
