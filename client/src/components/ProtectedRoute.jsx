import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // console.log(!!localStorage.getItem("token"));
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
