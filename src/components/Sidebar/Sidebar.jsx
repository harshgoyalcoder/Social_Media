import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SchoolIcon from "@mui/icons-material/School";
import { Users } from "../../dummyData"; // Importing the dummy data
import CloseFriends from "../CloseFriends/CloseFriends";
import { Link } from "react-router-dom";

export default function Sidebar() {
  // Use the dummy data directly
  const [allUsers, setAllUsers] = useState(Users);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li>
            <RssFeedIcon className="side-icon" />
            <span>Feed</span>
          </li>
          <li>
            <ChatIcon className="side-icon" />
            <span>Chats</span>
          </li>
          <li>
            <PlayCircleIcon className="side-icon" />
            <span>Videos</span>
          </li>
          <li>
            <GroupsIcon className="side-icon" />
            <span>Groups</span>
          </li>
          <li>
            <BookmarkIcon className="side-icon" />
            <span>Bookmarks</span>
          </li>
          <li>
            <HelpOutlineIcon className="side-icon" />
            <span>Questions</span>
          </li>
          <li>
            <WorkOutlineIcon className="side-icon" />
            <span>Jobs</span>
          </li>
          <li>
            <EventNoteIcon className="side-icon" />
            <span>Events</span>
          </li>
          <li>
            <SchoolIcon className="side-icon" />
            <span>Courses</span>
          </li>
        </ul>

        {/* button for show more */}

        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {allUsers.map((user) => (
            <Link to={"/profile/" + user.username} key={user.id}>
              <CloseFriends user={user} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
