import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import TopBar from "../components/TopBar";
import ProfileCard from "../components/ProfileCard";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <div className="w-full pb-20 2xl:px-40 bg-bgColor  overflow-hidden h-[200vh]">
      {/* <TopBar /> */}
      <div className="w-full  px-8 flex gap-2 lg:gap-4 pt-5 pb-10 h-gull">
        {/* left */}
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-auto">
          <ProfileCard user={user} />
        </div>
        {/* Center */}

        {/* Right */}
      </div>
    </div>
  );
};

export default Home;
