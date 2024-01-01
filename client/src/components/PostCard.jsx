/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import NoProfile from "../assets/userprofile.png";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { postComments } from "../assets/data";

const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  return (
    <div className="mb-2 bg-primary p-4 rounded-xl">
      {/* header of post */}
      <div className="flex gap-3 items-center mb-2 ">
        {/* for profile photo  */}
        <Link to={`/profile/${post?.userId?._id}`}>
          <img
            src={post?.image ?? NoProfile}
            alt={post?.userId?.firstName}
            className="w-14 h-12 object-cover rounded-full"
          />
        </Link>

        {/* Firstname and lastName  */}
        <div className="w-full flex justify-between">
          <div className="">
            <Link to={`/profile/${post?.userId?._id}`}>
              <p className="font-medium text-lg text-ascent-1">
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
            </Link>
            <span className="text-ascent-2">{post?.userId?.location}</span>
          </div>

          {/* posting time of image  */}
          <span className="text-ascent-2">
            {moment(post?.createdAt ?? "2023-12-30").fromNow()}
          </span>
        </div>
      </div>

      {/* post description section */}
      <div className="">
        <p className="text-ascent-2">
          {showAll === post?._id
            ? post?.description
            : post?.description.slice(0, 300)}
          {post?.description?.length > 301 &&
            (showAll === post?._id ? (
              <span
                className=" ml-2 text-base text-blue cursor-pointer"
                onClick={() => setShowAll(0)}
              >
                Show Less
              </span>
            ) : (
              <span
                className="ml-2 text-base text-blue cursor-pointer"
                onClick={() => setShowAll(post?._id)}
              >
                Show More
              </span>
            ))}
        </p>
      </div>

      {/* image section */}
      {post?.image && (
        <img
          src={post?.image}
          alt={post?.firstName}
          className="w-full mt-5 rounded-lg"
        />
      )}
    </div>
  );
};

export default PostCard;
