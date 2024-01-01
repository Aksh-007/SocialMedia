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
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  // for getComments
  const getComments = async () => {
    setReplyComments(0);
    setComments(postComments);
    setLoading(false);
  };

  // function to show all comments
  const showAllComments = () => {
    setComments(showComments === post?._id ? null : post?._id);
    getComments(post?._id);
  };
  return (
    <div className="mb-2 bg-primary p-4 rounded-xl">
      {/* header of post */}
      <div className="flex gap-3 items-center mb-2 ">
        {/* for profile photo  */}
        <Link to={`/profile/${post?.userId?._id}`}>
          <img
            src={post?.image ?? NoProfile}
            alt={post?.userId?.firstName}
            className="w-14 h-12 object-cover rounded-full "
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

        {/* image section */}
        {post?.image && (
          <img
            src={post?.image}
            alt={post?.firstName}
            className="w-full mt-5 rounded-lg shadow-2xl "
          />
        )}
      </div>

      {/* Like and comment section */}
      <div
        className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
      text-base border-t border-[#66666645]"
      >
        {/* this is for likr */}
        <p className="flex gap-2 items-center text-base cursor-pointer">
          {/* here to check if user like the post */}
          {post?.likes?.includes(user?._id) ? (
            <BiSolidLike size={20} color="blue" />
          ) : (
            <BiLike size={20} />
          )}
          {post?.likes?.length} Likes
        </p>

        {/* On click of comments show all the comments on the post */}
        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={() => {
            setShowComments(showComments === post._id ? null : post._id);
            getComments(post?._id);
          }}
        >
          <BiComment size={20} />
          {post?.comments?.length} Comments
        </p>

        {/* This is for delete button render if the post is of user  */}
        {user?._id === post?.userId?._id && (
          <div
            className="flex gap-1 items-center text-base text-ascent-1 cursor-pointer"
            onClick={() => deletePost(post?._id)}
          >
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )}
      </div>

      {/* Comments form to post comment */}
      {showComments === post?._id && (
        <div className="w-full mt-4 border-t border-[#66666645] pt-4 ">
          <CommentForm
            user={user}
            id={post?._id}
            getComments={() => getComments(post?._id)}
          />

          {loading ? (
            <Loading />
          ) : comments?.length > 0 ? (
            comments?.map((comment) => (
              <div className="w-full py-2" key={comment?._id}>
                <div className="flex gap-3 items-center mb-1">
                  <Link to={"/profile/" + comment?.userId?._id}>
                    <img
                      src={comment?.userId?.profileUrl ?? NoProfile}
                      alt={comment?.userId?.firstName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <Link to={"/profile/" + comment?.userId?._id}>
                      <p className="font-medium text-base text-ascent-1">
                        {comment?.userId?.firstName} {comment?.userId?.lastName}
                      </p>
                    </Link>
                    <span className="text-ascent-2 text-sm">
                      {moment(comment?.createdAt ?? "2023-05-25").fromNow()}
                    </span>
                  </div>
                </div>

                <div className="ml-12">
                  <p className="text-ascent-2">{comment?.comment}</p>

                  <div className="mt-2 flex gap-6">
                    <p className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer">
                      {comment?.likes?.includes(user?._id) ? (
                        <BiSolidLike size={20} color="blue" />
                      ) : (
                        <BiLike size={20} />
                      )}
                      {comment?.likes?.length} Likes
                    </p>
                    <span
                      className="text-blue cursor-pointer"
                      onClick={() => setReplyComments(comment?._id)}
                    >
                      Reply
                    </span>
                  </div>

                  {replyComments === comment?._id && (
                    <CommentForm
                      user={user}
                      id={comment?._id}
                      replyAt={comment?.from}
                      getComments={() => getComments(post?._id)}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <span className="flex text-sm py-4 text-ascent-2 text-center">
              No Comments, be first to comment
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
