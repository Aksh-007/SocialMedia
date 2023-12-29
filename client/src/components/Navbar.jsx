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

const Navbar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="w-full h-[80px] lg:h-[100px] flex items-center justify-between py-3 md:py-6 px-[90px] bg-primary shadow-xl sticky top-0 backdrop-blur-md z-10">
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
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        {/* toggle icon for theme change */}
        <button onClick={handleTheme}>
          {theme === "light" ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>

        {/* logout button */}
        <div>
          <CustomButton
            onClick={logout}
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
