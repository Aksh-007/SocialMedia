import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../utils/BaseUrl.js";
const VerifyEmail = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const verifyEmail = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}user/verifyEmail/${userId}/${token}`
      );

      console.log("Message state", message);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setMessage(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };
  useEffect(() => {
    verifyEmail();
  }, [userId]);

  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <h1 className="text-ascent-1 text-lg font-semibold ">
          Email Verification failed
        </h1>
        <span className="text-sm text-ascent-2">{message}</span>
      </div>
    </div>
  );
};

export default VerifyEmail;
