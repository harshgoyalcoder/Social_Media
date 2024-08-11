import React from 'react';
import './Online.css';

export default function Online({user}) {
const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className='friendList'>
    <div>
      <img src={PF+user.profilePicture} alt=''/>
      <span></span>
    </div>
    <span className='rightbarUsername' >{user.username}</span>
  </li>
  )
}
