import React, { useState, useEffect } from "react";
import "./Post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

// Dummy data
import { Users } from "../../dummyData";

export default function Post({ post }) {
  // Set default values to avoid undefined issues
  const [like, setLike] = useState(post.like || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // Hardcoded currentUser for demonstration purposes
  const currentUser = {
    _id: 1,
    username: "Mr. Harsh",
  };

  useEffect(() => {
    // Ensure post.likes is always an array
    setIsLiked(post.likes ? post.likes.includes(currentUser._id) : false);
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    // Find user from dummy data
    const foundUser = Users.find((u) => u.id === post.userId);
    setUser(foundUser || {}); // Handle case where user might not be found
  }, [post.userId]);

  const likeHandler = () => {
    // Simulate like functionality
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postTopLeftImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span>{user.username}</span>
            <span>{format(post.date)}</span>
          </div>

          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>

        <div className="postCenter">
          <span>{post.desc}</span>
          <img src={PF + post.photo} alt="" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img src={`${PF}/like.png`} alt="" onClick={likeHandler} />
            <img src={`${PF}/heart.png`} alt="" onClick={likeHandler} />
            <span>{like} people liked it</span>
          </div>

          <div className="postBottomRight">
            <span>{post.comment || 0} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
