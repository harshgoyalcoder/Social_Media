import React, { useEffect, useState } from 'react';
import './Rightbar.css';
import {Users} from '../../dummyData';
import Online from '../Online/Online';
import axios from 'axios';
import {Link} from "react-router-dom";
import { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext";
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

export default function Rightbar({user}) {

const PF=process.env.REACT_APP_PUBLIC_FOLDER;
const [friends,setFriends]=useState([]);
const {user:currentUser,dispatch}=useContext(AuthContext);
const [followed,setFollowed]=useState(currentUser.following.includes(user?._id));
const [senderId, setSenderId] = useState(null);
const [receiverId, setReceiverId] = useState(null);

// useEffect(()=>{
//   setFollowed(currentUser.followings.includes(user?._id))
// },[currentUser,user.id]);

useEffect(()=>{
   // This function is called every time the value of the `user` prop changes
   const getFriends=async()=>{
    try{
      // Make a request to the `/users/friends/` endpoint with the user's ID
    const friendList=await axios.get("/users/friends/" +currentUser._id )
    // Set the `friends` state to the data returned from the request
    // console.log(user._id);
    setFriends(friendList.data);
    console.log(friendList.data)
    }catch(err){
      console.log("err");
    }
   };
   getFriends();
},[user])

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });

        console.log("first thing of follow");
        // Dispatch a `UNFOLLOW` action with the other user's ID
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        })
           console.log("else thing of follow");
              // Dispatch a `FOLLOW` action with the other user's ID
        dispatch({ type: "FOLLOW", payload: user._id });
      }
       // Set the `followed` state to the opposite of its current value
      setFollowed(!followed);
    } catch (err) {
      console.log("err2");

    }
  };

  const handleChat=async(e)=>{
    e.preventDefault();

    const data = {senderId,
      receiverId}

    try {
     await axios.post("/conversation", data);
     
        console.log("Conversation started successfully");
        window.location.href = "/messenger";
      } 
        catch (error) {
      console.log("error");
    }
  }
  const HomeRightBar=()=>{
    return(
    <>
   
      <div className="birthdayContainer">
            <img src="assets/gift.png" alt="" />
            <span>
              <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
            </span>
      </div>
       <img className="rightbarAd" src="assets/ad.png" alt="" />
       <h4 className="rightbarTitle">Online Friends</h4>
       <ul className='rightbarFriendList'>
        {Users.map(u=>(
          <Online key={u.id} user={u}/>
        ))}
  
       </ul>
    </>
    );
  };

  const ProfileRightBar=()=>{
    return(
      <>
       {/* creating a button for follow */}
    {user.username!== currentUser.username && (
    <button className='rightbarFollowButton' onClick={handleClick}>
        {followed ? "Unfollow":"Follow"}
        {followed ? <Remove/>:<Add/>}
      </button>
    )}
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
            <div>
              <span >City:</span>
              <span >{user.city}</span>
            </div>
            <div>
              <span>From:</span>
              <span>{user.from}</span>
            </div>
            <div>
              <span>Relationship:</span>
              <span >{user.relationship===1? "Single" : user.relationship===2 ? "Married":"-" }</span>
            </div>
          </div>
        <h4 className='rightbarTitle'>User Friends</h4>
        <div className="rightbarFollowings">
            {friends.map((friend)=>(
              <>
              <div className="rightbarFollowingsDiv" >
              <img src={friend.profilePicture? PF+friend.profilePicture:PF+"person/noAvatar.png"} alt="" />
              <Link to={"/profile/"+friend.username}>
              <span>{friend.username}</span>
              
            </Link>
            <button onClick={ setReceiverId(friend._id) ||setSenderId(user._id) || handleChat}   >Start A Conversation</button>
            </div>
            </>

            ))}
           
          </div>
      </>
    )
  }





  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user?<ProfileRightBar/> : <HomeRightBar/>}
      </div>
    </div>
    )
  }
  
  
  
  

          
  