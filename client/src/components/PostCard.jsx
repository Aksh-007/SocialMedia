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
  return (
    <div className="">
      <h1>Post Card</h1>
    </div>
  );
};

export default PostCard;
