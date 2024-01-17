import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  // console.log(!!localStorage.getItem("token"));
  let isAuthenticated = !!Cookies.get("token");
  // isAuthenticated = ;
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
