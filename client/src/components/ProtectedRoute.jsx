import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  let isAuthenticated = Cookies.get("token") ? true : false;
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
