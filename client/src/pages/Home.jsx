import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import FriendsCard from "../components/FriendsCard";
import { friends } from "../assets/data";
import { useState } from "react";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log("userDetauils", user?.friends);

  const [friendRequest, setFriendRequest] = useState(friends);
  const [suggestedFriends, setSuggestedFriends] = useState(friends);
  return (
    <div className="w-full h-full pb-20 lg:px-20 bg-bgColor  overflow-hidden ">
      {/* <Navbar /> */}
      <div className="w-full  flex gap-2 lg:gap-4 pt-5 pb-10 ">
        {/* left */}
        <div
          className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-auto"
          // style={{ border: "2px solid black" }}
        >
          <ProfileCard {...user} key={user?._id} />
          <FriendsCard {...user} key={user?._id} />
        </div>
        {/* Center */}
        <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto"></div>

        {/* Right */}
        <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
          {/* friend Request */}
          <div className="w-full bg-primary shadow-sm rounded-lg px-6 p-5">
            <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-borderColor">
              <span>Friend Request</span>
              <span>{friendRequest?.length}</span>
            </div>
          </div>

          {/* suggested Friends */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
