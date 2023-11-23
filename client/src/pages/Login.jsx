import { TbSocial } from "react-icons/tb";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading.jsx";
import CustomButton from "../components/CustomButton.jsx";
import BgImage from "../assets/img.jpeg";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onchnage",
  });

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitiing] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-[80vh] 2xl py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl ">
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

          <p className="text-ascent-1 text-base font-semibold">
            Log in to your account
          </p>
          <span className="text-sm mt-2 text-ascent-2">Welcome back</span>

          {/* Login form */}

          <form className="py-8 flex flex-col gap-5">
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={register("email", {
                required: "Email Address is required",
              })}
              styles="w-full rounded-full"
              labelStyle="ml-2 "
              error={errors.email ? errors.email.message : ""}
            />
            <TextInput
              name="Password"
              placeholder="Password"
              label="Password"
              type=""
              register={register("email", {
                required: "Email Address is required",
              })}
              styles="w-full rounded-full"
              labelStyle="ml-2 "
              error={errors.email ? errors.email.message : ""}
            />

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
                containerStyles="inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none"
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
        <div className="hidden w-1/2 h-full lg:flex flex-col item-center justify-center bg-blue">
          <div className="relative w-full flex items-center justify-center">
            <img
              src={BgImage}
              alt="Bg-Image"
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
