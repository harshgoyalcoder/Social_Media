import React, { useState } from "react";
import "./Rightbar.css";
import { Users } from "../../dummyData";
import Online from "../Online/Online";
import { Link } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

// Hardcoded current user and profile user for demonstration
const currentUser = {
  id: 1,
  username: "JohnDoe",
  following: [2, 3], // Example of followed user IDs
};

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id)
  );
  const [friends, setFriends] = useState([]);

  // Simulate fetching friends data
  const getFriends = () => {
    const userFriends = Users.filter((u) => u.id !== currentUser.id); // Simulate friends list
    setFriends(userFriends);
  };

  // Initialize friends list on component mount
  React.useEffect(() => {
    getFriends();
  }, []);

  const handleClick = () => {
    if (followed) {
      // Simulate unfollowing the user
      console.log(`Unfollowed user ID: ${user._id}`);
    } else {
      // Simulate following the user
      console.log(`Followed user ID: ${user._id}`);
    }
    setFollowed(!followed);
  };

  const handleChat = (receiverId) => {
    // Simulate starting a conversation
    console.log(`Starting a conversation with user ID: ${receiverId}`);
    window.location.href = "/messenger";
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" />
          <span>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div>
            <span>City:</span>
            <span>{user.city}</span>
          </div>
          <div>
            <span>From:</span>
            <span>{user.from}</span>
          </div>
          <div>
            <span>Relationship:</span>
            <span>
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <div key={friend.id} className="rightbarFollowingsDiv">
              <img
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              <Link to={"/profile/" + friend.username}>
                <span>{friend.username}</span>
              </Link>
              <button onClick={() => handleChat(friend.id)}>
                Start A Conversation
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <HomeRightBar />
        {/* {user ? <ProfileRightBar /> : <HomeRightBar />} */}
      </div>
    </div>
  );
}
