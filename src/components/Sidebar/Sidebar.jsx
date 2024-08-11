import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SchoolIcon from '@mui/icons-material/School';
// import { Users } from '../../dummyData';
import CloseFriends from '../CloseFriends/CloseFriends';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Sidebar() {
  const[allUsers,setAllUsers]=useState([]);
  
  useEffect(() => {
    const getAllUsers=async()=>{
      try{
        const res=await axios.get("/users/all");
        setAllUsers(res.data);
      }catch(err){
        console.log(err);
      };

    }
    getAllUsers();
  }, []);


  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className='sidebarList'>
          <li>
            <RssFeedIcon className='side-icon' />
            <span>Feed</span>
          </li>
          <li>
            <ChatIcon className='side-icon' />
            <span>Chats</span>
          </li>
          <li>
            <PlayCircleIcon className='side-icon' />
            <span>Videos</span>
          </li>
          <li>
            <GroupsIcon className='side-icon' />
            <span>Groups</span>
          </li>
          <li>
            <BookmarkIcon className='side-icon' />
            <span>Bookmarks</span>
          </li>
          <li>
            <HelpOutlineIcon className='side-icon' />
            <span>Quesions</span>
          </li>
          <li>
            <WorkOutlineIcon className='side-icon' />
            <span>Jobs</span>
          </li>
          <li>
            <EventNoteIcon className='side-icon' />
            <span>Events</span>
          </li>
          <li>
            <SchoolIcon className='side-icon' />
            <span>Courses</span>
          </li>
        </ul>

        {/* button for show more */}

        <button className='sidebarButton'>Show More</button>
        <hr className='sidebarHr'/>
        <ul className='sidebarFriendList'>
        {allUsers.map( (user)=>(
           <Link to={"/profile/"+user.username}>
             <CloseFriends key={user._id} user={user}/>
           </Link>
        // <li key={user._id}>{user.username}</li>
      ))}
        </ul>
      </div>
    </div>
  )
}
