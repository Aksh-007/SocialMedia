import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const ProtectedRoute = () => {
  // console.log(!!localStorage.getItem("token"));
  let isAuthenticated = !!localStorage.getItem("token");
  isAuthenticated = true;
  // console.log("isAuthenticated is", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
