import React from "react";
import "./Topbar.css";
import Person from "@mui/icons-material/Person";
import Chat from "@mui/icons-material/Chat";
import Notification from "@mui/icons-material/NotificationsNone";
import Search from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Users } from "../../dummyData"; // Importing the dummy data

export default function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  // Using the first user as the logged-in user for this example
  const user = Users[0];

  // Dummy public folder path
  const PF = "/assets/";

  return (
    <div className="topbarContainer">
      {/* logo */}
      <div className="topbarLeft">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <span>Chit-Chat</span>
        </Link>
      </div>
      {/* search section */}
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend/post/video"
            className="searchInput"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div>
          <span>Homepage</span>
          <span>Timeline</span>
        </div>

        <div>
          <div>
            <Person className="topbarRight-icons" />
            <span>1</span>
          </div>

          <div>
            <Link to={"/messenger"}>
              <Chat className="topbarRight-icons" />
            </Link>
            <span>2</span>
          </div>
          <div>
            <Notification className="topbarRight-icons" />
            <span>1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={PF + user.profilePicture} alt="" className="topbarImage" />
        </Link>
        <div>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    </div>
  );
}
