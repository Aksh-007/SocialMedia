import { useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import TextInput from "../components/TextInput.jsx";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading.jsx";
import Cookies from "js-cookie";

const ChangePassword = () => {
  const { userId } = useParams();
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
      console.log("data is", data);
      const response = await axios.post(
        `https://social-media-backend-hazel.vercel.app/api/v1/user/change-password/${userId}`,
        data,
        {
          withCredentials: true, // Enable sending cookies
        }
      );
      toast.success(response?.data?.message);
      //   deleting cookies
      Cookies.remove("token", { path: "/" });
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
            name="oldPassword"
            label="Old Password"
            placeholder="Enter Old Password"
            type="Password"
            styles="w-full "
            register={register("oldPassword", {
              required: "Password is required!",
            })}
            error={errors.oldPassword ? errors.oldPassword?.message : ""}
          />

          <TextInput
            name="newPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            type="Password"
            styles="w-full "
            register={register("newPassword", {
              validate: (value) => {
                const { password } = getValues();
                if (password != value) {
                  return "Password do not match";
                }
              },
            })}
            error={
              errors.newPassword && errors.newPassword.type === "validate"
                ? errors.newPassword?.message
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

export default ChangePassword;
