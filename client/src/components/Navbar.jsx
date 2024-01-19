import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { setTheme } from "../redux/theme";
import { useNavigate } from "react-router-dom";
import { Logout } from "../redux/userSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   function to toggle theme
  const handleTheme = () => {
    let themeValue = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", JSON.stringify(themeValue));
    dispatch(setTheme(themeValue));
  };

  //   handle search
  const handleSearch = async (data) => {
    console.log(data);
  };

  // logout function
  const logout = () => {
    dispatch(Logout());
    navigate("/login");
  };

  return (
    <div className="w-full h-[80px] lg:h-[95px] flex items-center justify-between py-3 md:py-6 px-8 lg:px-[90px] bg-primary shadow-xl sticky top-0 backdrop-blur-md z-10">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
          <TbSocial />
        </div>
        <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
          LinkLeap
        </span>
      </Link>

      <form
        className="hidden md:flex items-center justify-center "
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder="Search..."
          styles="w-[18rem] lg:w-[33rem]  rounded-l-full py-3 "
          register={register("search")}
        />
        <CustomButton
          title="Search"
          type="submit"
          containerStyles="bg-[#0444a4] h-[46px] text-white px-6 py-2.5 mt-2 rounded-r-full"
        />
      </form>

      {/* ICONS */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl ">
        {/* toggle icon for theme change */}
        <button onClick={handleTheme}>
          {theme === "light" ? <BsMoon size={25} /> : <BsSunFill size={25} />}
        </button>
        <div className="hidden lg:flex ">
          <IoMdNotificationsOutline className="cursor-pointer" size={25} />
        </div>

        {/* logout button */}
        <div className="hidden md:flex">
          <CustomButton
            onClick={logout}
            title="Log Out"
            containerStyles="text-sm h-[45px] text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
        </div>

        {/* hamburger */}
        <div
          className="md:hidden"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <GiHamburgerMenu className="cursor-pointer" size={25} />
        </div>

        {/* sidebar */}

        {isSidebarOpen && (
          <div className="fixed top-[80px] right-0 h-[91vh] w-64 bg-primary text-white p-4">
            <div
              className="font-medium text-[1.1rem] text-ascent-1 
              flex flex-col gap-6
              "
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              <p>Profile </p>
              <p>Friends</p>
              <p>Friends Request</p>
              <p>Friends Suggestion</p>
              <div>
                <CustomButton
                  onClick={logout}
                  title="Log Out"
                  containerStyles="text-sm h-[45px] text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
