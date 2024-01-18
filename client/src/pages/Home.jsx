import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import FriendsCard from "../components/FriendsCard";
import { suggest, requests, posts } from "../assets/data";
import { useEffect, useState } from "react";
import NoProfile from "../assets/userprofile.png";
import CustomButton from "../components/CustomButton";
import TextInput from "../components/TextInput.jsx";
import { useForm } from "react-hook-form";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import Loading from "../components/Loading.jsx";
import PostCard from "../components/PostCard.jsx";
import FriendsRequest from "../components/FriendsRequest.jsx";
import FriendsSugestion from "../components/FriendsSugestion.jsx";
import EditProfile from "../components/EditProfile.jsx";
const Home = () => {
  const { UpdateProfile } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  // getting user details from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // submit data
  const submitData = async (data) => {
    console.log(data);
  };

  return (
    <>
      <div
        className="w-full h-full pb-20 lg:px-20 bg-bgColor  overflow-hidden "
        // style={{ border: "2px solid blue" }}
      >
        {/* <Navbar /> */}
        <div className="w-full  flex gap-2 lg:gap-4  lg:pt-5 pb-10 ">
          {/* left */}
          <div
            className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-auto "
            // style={{ border: "2px solid black" }}
            key={user?._id}
          >
            <ProfileCard {...user} />
            <FriendsCard {...user} />
          </div>

          {/* Center */}
          <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto shadow-sm rounded-lg">
            <form
              className="bg-primary px-4 rounded-lg"
              onSubmit={handleSubmit(submitData)}
            >
              <div className="w-full flex items-center gap-2 p-4 border-b border-borderColor ">
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt={user?.firstName}
                  className="w-14 h-14 rounded-full object-cover mt-2"
                />
                <TextInput
                  styles="w-full rounded-full py-5 ml-4"
                  placeholder="What's on your mind.....?"
                  name="description"
                  register={register("description", {
                    required: "Write Something about post",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
              </div>
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  }mt-0.5`}
                ></span>
              )}

              {/* Image Uploading Section */}
              <div className="flex items-center justify-between py-4">
                {/* For Image */}
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-2 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg,.png,.jpeg"
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                {/* For Gif */}
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-2 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="vgifUpload"
                    data-max-size="5120"
                    accept=".gif"
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                {/* For videos */}
                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="videoUpload"
                >
                  <input
                    type="file"
                    data-max-size="5120"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="videoUpload"
                    accept=".mp4, .wav"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>
                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="Post"
                      containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                    />
                  )}
                </div>
              </div>
            </form>

            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={() => {}}
                  likePost={() => {}}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-4 overflow-y-auto">
            {/* friend Request */}
            <FriendsRequest />

            {/* suggested Friends */}
            <FriendsSugestion />
          </div>
        </div>
      </div>
      {UpdateProfile && <EditProfile />}
    </>
  );
};

export default Home;
