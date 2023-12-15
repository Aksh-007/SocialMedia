import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import Loading from "../components/Loading";
import CustomButton from "../components/CustomButton";
const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    console.log(data);
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
            type="email"
            register={register("email", {
              required: "Email address is required",
            })}
            styles="w-full"
            labelStyle="ml-2"
            error={errors.email ? errors.email.message : ""}
          />
          {errMsg?.message && (
            <span
              role="alert"
              className={`text-sm ${
                errMsg?.status === "failed"
                  ? "text-[#f64949fe]"
                  : "text-[#2ba150fe]"
              }`}
            >
              {errMsg?.message}
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

export default ResetPassword;
