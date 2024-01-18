import { TbSocial } from "react-icons/tb";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading.jsx";
import CustomButton from "../components/CustomButton.jsx";
import BgImage from "../assets/img.jpeg";
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { UserLogin } from "../redux/userSlice.js";
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitiing] = useState(false);
  const [password, setPassword] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      setIsSubmitiing(true);

      const response = await axios.post(
        `https://social-media-backend-hazel.vercel.app/api/v1/auth/login`,
        data
      );
      if (response.status === 200) {
        const token = response?.data?.token;
        Cookies.set("token", token, { expires: 1 });
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        // dispatch(Login(response?.data?.user));
        toast.success(response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ?? error?.message);
    } finally {
      setIsSubmitiing(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPassword(!password);
  };
  return (
    <div className="bg-bgColor w-full h-[100vh]  md:h-[100vh] flex items-center justify-center p-6">
      {/* <div className="w-full md:w-2/3 h-fit lg:h-[80vh] 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl"> */}

      <div className="w-full md:w-2/3 h-[85vh] lg:h-full 2xl:h-5.5/6 py-8 lg:py-0 flex  bg-primary rounded-xl overflow-hidden shadow-xl">
        {/* left */}
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-6 ">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <TbSocial />
            </div>
            <span className="text-2xl text-[#065ad8] font-semibold">
              LinkLeap
            </span>
          </div>

          <p className="text-ascent-1 text-xl font-semibold">
            Log in to your account
          </p>
          <span className="text-sm font-semibold  mt-2 text-ascent-2">
            Welcome back
          </span>

          {/* Login form */}
          <form
            className="py-4 flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={register("email", {
                required: "Email Address is required",
              })}
              styles="w-full "
              labelStyle="ml-2 "
              error={errors.email ? errors.email.message : ""}
            />

            <TextInput
              name="password"
              label="Password"
              placeholder="Password"
              type={password ? "text" : "Password"}
              styles="w-full "
              labelStyle="ml-2"
              autocomplete
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password?.message : ""}
            />
            {/* <span onClick={togglePasswordVisibility}>
              {password ? <MdVisibilityOff /> : <MdVisibility />}
            </span> */}
            <div>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                onClick={togglePasswordVisibility}
              />
              <label className="text-ascent-1 text-l "> Show Password</label>
              <br></br>
            </div>
            <Link
              to="/reset-password"
              className="text-sm text-right text-blue font-semibold "
            >
              Forgot Password
            </Link>
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles="inline-flex justify-center rounded-md bg-blue px-8 py-3 text-[1.2rem] font-medium text-white outline-none"
                title="Login"
              />
            )}
          </form>

          {/* Create account */}
          <p className="text-ascent-2 text-sm text-center">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="text-[#065ad8] font-semibold ml-2 cursor-pointer"
            >
              Create Account
            </Link>
          </p>
        </div>
        {/* right */}
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue">
          <div className="relative w-full flex items-center justify-center">
            <img
              src={BgImage}
              alt="Bg Image"
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
            />

            <div className="absolute flex items-center gap-1 bg-white right-5 top-21 py-2 px-5 rounded-full">
              <BsShare size={14} />
              <span className="text-xs font-medium">Share</span>
            </div>

            <div className="absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full">
              <ImConnection />
              <span className="text-xs font-medium">Connect</span>
            </div>

            <div className="absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full">
              <AiOutlineInteraction />
              <span className="text-xs font-medium">Interact</span>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-white text-base">
              Connect with friedns & have share for fun
            </p>
            <span className="text-sm text-white/80">
              Share memories with friends and the world.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
