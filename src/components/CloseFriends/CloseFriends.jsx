import React from 'react';
import './CloseFriends.css';

export default function CloseFriends({user}) {
const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  return (
     
        <li className='onlineFriend'>
            <img src={user.profilePicture? PF+user.profilePicture:PF+"person/noAvatar.png"}alt=''/>
            
            <span>{user.username}</span>
          </li>
   
  )
}
