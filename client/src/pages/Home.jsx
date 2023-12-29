import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopBar from "../components/TopBar";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const logout = () => {
    console.log("logout click");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
      <TopBar />
      <h1 className="text-sm font-semibold  mt-2 text-ascent-2">Home</h1>
      <button
        className="text-sm font-semibold  mt-2 text-ascent-2"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
