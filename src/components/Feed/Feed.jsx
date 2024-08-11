import React, { useContext, useEffect, useState } from "react";
import "./Feed.css";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { AuthContext } from "../../context/AuthContext";
import { Posts, Users } from "../../dummyData"; // Importing the dummy data

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Filter posts based on the provided username or the current user's ID
    const fetchPosts = () => {
      const filteredPosts = Posts.filter((post) =>
        Users.find((u) => u.username === username && u.id === post.userId)
      );
      setPosts(filteredPosts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
