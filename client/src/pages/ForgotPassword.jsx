import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput.jsx";
import Loading from "../components/Loading.jsx";
import CustomButton from "../components/CustomButton.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `https://social-media-backend-hazel.vercel.app/api/v1/user/forgot-password`,
        data
      );
      console.log(response);
      toast.success(response?.data?.message);
      response.status === 200 ? navigate("/login") : "";
    } catch (error) {
      console.log(error);
      setErrMsg(error?.response?.data?.message);
      toast.error(error?.response?.data?.message ?? error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <h1 className="text-ascent-1 text-lg font-semibold ">Email Address</h1>
        <span className="text-sm text-ascent-2">
          Enter email address used during registration
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-3 flex flex-col gap-4 "
        >
          <TextInput
            name="email"
            placeholder="Enter email address"
            disabled={isSubmitting}
            type="email"
            register={register("email", {
              required: "Email address is required",
            })}
            styles="w-full"
            labelStyle="ml-2"
            error={errors.email ? errors.email.message : ""}
          />
          {errMsg && (
            <span
              role="alert"
              className={`text-sm ${
                errMsg?.status === "failed"
                  ? "text-[#f64949fe]"
                  : "text-[#2ba150fe]"
              }`}
            >
              {errMsg}
            </span>
          )}

          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-[1.21rem] font-medium text-white outline-none`}
              title="Submit"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
