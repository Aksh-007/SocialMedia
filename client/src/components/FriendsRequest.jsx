import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { requests } from "../assets/data";
import { Link } from "react-router-dom";
import NoProfile from "../assets/userprofile.png";

const FriendsRequest = () => {
  const [friendRequest, setFriendRequest] = useState(requests);
  return (
    <div className="w-full bg-primary shadow-sm rounded-lg px-6 p-5">
      <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-borderColor">
        <span>Friend Request</span>
        <span>{friendRequest?.length}</span>
      </div>
      <div className="w-full flex flex-col gap-4 pt-4">
        {friendRequest?.map((request) => (
          <div className="flex items-center justify-between" key={request._id}>
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
    </div>
  );
};

export default FriendsRequest;
