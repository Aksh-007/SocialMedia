import React, { useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { suggest } from "../assets/data";
import { Link } from "react-router-dom";
import NoProfile from "../assets/userprofile.png";

const FriendsSugestion = () => {
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  return (
    <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
      <div className="flex items-center justify-between text-xl text-ascent-1  border-b border-borderColor">
        <span> Friends Suggestion</span>
        {/* <span>{friendRequest?.length}</span> */}
      </div>
      <div className="w-full flex flex-col gap-4 pt-4">
        {suggestedFriends.map((friend) => (
          <div className="flex items-center justify-between" key={friend._id}>
            <Link
              to={`/profile/${friend?._id}`}
              key={friend._id}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <img
                src={friend?.profileUrl ?? NoProfile}
                alt={friend?.firstName}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1">
                <p className="text-base font-medium text-ascent-1">
                  {`${friend?.firstName} ${friend?.lastName}`}
                </p>
                <span className="text-sm text-ascent-2">
                  {friend?.profession ?? "No Profession"}
                </span>
              </div>
              <div>
                <button
                  className="bg-[#0444a430] text-sm  text-white p-1 rounded"
                  onClick={() => {}}
                >
                  <BsPersonFillAdd size={22} className="text-blue" />
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsSugestion;
