import React, { useEffect, useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { Link } from "react-router-dom";
import NoProfile from "../assets/userprofile.png";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";

const FriendsSugestion = () => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [isSubmitting, setIsSubmitiing] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const fetchSuggestion = async () => {
    try {
      setIsSubmitiing(true);
      const response = await axios.get(
        `https://social-media-backend-hazel.vercel.app/api/v1/user/friends-suggestion/${userId}`,
        { withCredentials: true }
      );
      setSuggestedFriends(response?.data?.suggestedFriends); // Use response.data to update the state
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitiing(false);
    }
  };
  useEffect(() => {
    // friendRequest
    fetchSuggestion();
  }, [userId]);

  // sent request to user
  const sentFrienedRequest = async (requestedUserId, firstName, lastName) => {
    try {
      const response = await axios.post(
        `https://social-media-backend-hazel.vercel.app/api/v1/user/sentfriendRequest/${userId}/${requestedUserId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
      <div className="flex items-center justify-between text-xl text-ascent-1  border-b border-borderColor">
        <span> Friends Suggestion</span>
        {/* <span>{friendRequest?.length}</span> */}
      </div>
      {isSubmitting ? (
        <Loading className="mt-[10px]" />
      ) : (
        <div className="w-full flex flex-col gap-4 pt-4">
          {suggestedFriends.map((friend) => (
            <div className="flex items-center justify-between" key={friend._id}>
              <div
                key={friend._id}
                className="w-full flex gap-4 items-center cursor-pointer"
              >
                <img
                  src={friend?.profileUrl ?? NoProfile}
                  alt={friend?.firstName}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <Link to={`/profile/${friend?._id}`} className="flex-1">
                  <p className="text-base font-medium text-ascent-1">
                    {`${friend?.firstName} ${friend?.lastName}`}
                  </p>
                  <span className="text-sm text-ascent-2">
                    {friend?.profession ?? "No Profession"}
                  </span>
                </Link>

                {/* button div */}
                <div>
                  <button
                    className="bg-[#0444a430] text-sm  text-white p-1 rounded"
                    onClick={() => {
                      sentFrienedRequest(
                        friend._id,
                        friend?.firstName,
                        friend?.lastName
                      );
                    }}
                  >
                    <BsPersonFillAdd size={22} className="text-blue" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsSugestion;
