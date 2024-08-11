import React, { useContext } from 'react';
import './Topbar.css';
import Person from '@mui/icons-material/Person';
import Chat from '@mui/icons-material/Chat';
import Notification from '@mui/icons-material/NotificationsNone';
import Search from '@mui/icons-material/Search';
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { Button } from '@mui/material';
export default function Topbar() {
  // const auth=localStorage.getItem('user');
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  }


  const {user}=useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='topbarContainer'>
      {/* logo */}
        <div className="topbarLeft">
          <Link to="/" style={{color:"white",textDecoration:"none"}}>
          <span>Chit-Chat</span>
          </Link>
        </div>
      {/*search section  */}
        <div className="topbarCenter">
          <div className="searchBar">
            <Search className='searchIcon'/>
            <input placeholder='Search for friend/post/video' className='searchInput'/>
          </div>
        </div>

        <div className="topbarRight">
          <div >
            <span >Homepage</span>
            <span >Timeline</span>
          </div>

          <div>
            <div>
              <Person className="topbarRight-icons"/>
              <span>1</span>
            </div>

          

            <div>
            <Link to={"/messenger"}>
              <Chat className="topbarRight-icons"/>
              </Link>
              <span>2</span>
            </div>
            <div>
              <Notification className="topbarRight-icons"/>
              <span>1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>

          <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt='' className='topbarImage'/>
          </Link>
          <div>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
    </div>
  )
}
