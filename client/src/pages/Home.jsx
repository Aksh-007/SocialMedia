import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import FriendsCard from "../components/FriendsCard";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log("userDetauils", user?.friends);
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

        {/* Right */}
      </div>
    </div>
  );
};

export default Home;
