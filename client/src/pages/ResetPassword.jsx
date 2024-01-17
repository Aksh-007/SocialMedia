import { useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import TextInput from "../components/TextInput";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../utils/baseUrl.js";
import Loading from "../components/Loading";

const ResetPassword = () => {
  const { userId, resetToken } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${baseUrl}user/reset-password/${userId}/${resetToken}`,
        data
      );
      toast.success(response?.data?.message);
      response.status === 200 ? navigate("/login") : "";
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ?? error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <h1 className="text-ascent-1 text-lg font-semibold ">Reset Password</h1>
        {/* <span className="text-sm text-ascent-2">Enter New Password</span> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-3 flex flex-col gap-4 "
        >
          <TextInput
            name="password"
            label="Password"
            placeholder="Enter Password"
            type="Password"
            styles="w-full "
            register={register("password", {
              required: "Password is required!",
            })}
            error={errors.password ? errors.password?.message : ""}
          />

          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            type="Password"
            styles="w-full "
            register={register("cPassword", {
              validate: (value) => {
                const { password } = getValues();
                if (password != value) {
                  return "Password do not match";
                }
              },
            })}
            error={
              errors.cPassword && errors.cPassword.type === "validate"
                ? errors.cPassword?.message
                : ""
            }
          />
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

export default ResetPassword;
