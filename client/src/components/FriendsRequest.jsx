import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { requests } from "../assets/data";
import { Link } from "react-router-dom";
import NoProfile from "../assets/userprofile.png";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "./Loading";

const FriendsRequest = () => {
  const [friendRequest, setFriendRequest] = useState(requests);
  const [isSubmitting, setIsSubmitiing] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  // useEffect to fetch data
  const fetchFriendRequest = async () => {
    try {
      setIsSubmitiing(true);
      const response = await axios.get(
        `https://social-media-backend-hazel.vercel.app/api/v1/user/friendRequest/${userId}`,
        // `http://localhost:5000/api/v1/user/friendRequest/${userId}`,
        { withCredentials: true }
      );
      console.log("friend Request", response);
      setFriendRequest(response?.data?.friendRequest); // Use response.data to update the state
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ?? error?.message);
    } finally {
      setIsSubmitiing(false);
    }
  };
  useEffect(() => {
    // friendRequest
    fetchFriendRequest();
  }, []);
  return (
    <>
      {isSubmitting ? (
        <Loading />
      ) : (
        <div className="w-full bg-primary shadow-sm rounded-lg px-6 p-5">
          <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-borderColor">
            <span>Friend Request</span>
            <span>{friendRequest?.length}</span>
          </div>

          {friendRequest.length === 0 ? (
            <div className="text-ascent-1">No Request</div>
          ) : (
            <div className="w-full flex flex-col gap-4 pt-4">
              {friendRequest?.map((request) => (
                <div
                  className="flex items-center justify-between"
                  key={request._id}
                >
                  <Link
                    to={`/profile/${request._id}`}
                    className="w-full flex gap-4 items-center cursor-pointer"
                  >
                    <img
                      src={request?.requestFrom?.profileUrl ?? NoProfile}
                      alt={request?.requestFrom?.firstName}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-ascent-1">
                        {`${request?.requestFrom?.firstName} ${request?.requestFrom?.lastName}`}
                      </p>
                      <span className="text-sm text-ascent-2">
                        {request?.requestFrom?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>

                  <div className="flex gap-1 ">
                    <CustomButton
                      title="Accept"
                      containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"
                    />
                    <CustomButton
                      title="Deny"
                      containerStyles="border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FriendsRequest;
