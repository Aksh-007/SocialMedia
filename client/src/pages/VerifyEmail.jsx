import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";

const VerifyEmail = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitiing] = useState(false);
  const verifyEmail = async () => {
    try {
      setIsSubmitiing(true);
      const response = await axios.get(
        `https://social-media-backend-hazel.vercel.app/api/v1/user/verifyEmail/${userId}/${token}`
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setMessage(response?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setMessage(error?.response?.data?.message || "Something Went Wrong");
      toast.error(message);
    } finally {
      setIsSubmitiing(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [userId]);

  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
      {isSubmitting ? (
        <Loading />
      ) : (
        <div
          className={`bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg ${
            message.includes("success") ? "bg-success" : "bg-failure"
          }`}
        >
          <h1
            className={`text-ascent-1 text-lg font-semibold ${
              message.includes("success") ? "text-success" : "text-failure"
            }`}
          >
            Email Verification: {message}
          </h1>
          <span
            className={`text-sm ${
              message.includes("success") ? "text-success" : "text-failure"
            }`}
          >
            {message}
          </span>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
