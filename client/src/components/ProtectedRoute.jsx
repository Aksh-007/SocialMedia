import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // console.log(!!localStorage.getItem("token"));
  let isAuthenticated = !!localStorage.getItem("token");
  isAuthenticated = true;
  // console.log("isAuthenticated is", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
