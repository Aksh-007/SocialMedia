import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
function App() {
  localStorage.setItem("theme", JSON.stringify("dark"));
  localStorage.setItem("user", JSON.stringify("akshay"));
  return (
    <>
      <Toaster />
      <div className="w-full min-h-[80vh]">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id?" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
