import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./redux/theme.js";
import useScrollTop from "./utils/useScrollTop.js";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
function App() {
  const { theme } = useSelector((state) => state.theme);
  // const dispatch = useDispatch();

  // sytem default theme
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  let userPrefersMode = darkThemeMq?.matches;
  localStorage.setItem(
    "theme",
    JSON.stringify(userPrefersMode ? "dark" : "light")
  );
  // dispatch(setTheme(userPrefersMode ? "dark" : "light"));

  //

  useScrollTop();
  return (
    <>
      <Toaster />
      <div data-theme={theme} className="w-full min-h-[80vh]">
        {/* <div className="w-full min-h-[80vh]"> */}
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id?" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route
            path="api/v1/user/verifyEmail/:userId/:token"
            element={<VerifyEmail />}
          />
          <Route
            path="api/v1/user/reset-password/:userId/:resetToken"
            element={<ResetPassword />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
