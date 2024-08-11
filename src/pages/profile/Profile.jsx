import React, { useEffect, useState } from 'react';
import './profile.css';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Rightbar from '../../components/Rightbar/Rightbar';
import AddIcon from '@mui/icons-material/Add';

import Feed from '../../components/Feed/Feed';
import axios from 'axios';
import { useParams } from 'react-router';

export default function Profile() {

 
  // const [file, setFile] = useState(null);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const handleUpload = () => {
  //   if (!file) {
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   axios.post('/upload', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //     .then((response) => {
  //       console.log('File uploaded successfully');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const[user,setUser]=useState({});
  const username=useParams().username;
  // console.log(username);

  useEffect(()=>{
    const fetchUser=async () =>{
      const res=await axios.get(`/users?username=${username}`)
      setUser(res.data);
  
    };
    fetchUser();
  },[username])


  return (
  <div>
    <Topbar/>
    <div className="profile">
      <Sidebar/>
      
      <div className="profileRight">
        <div className="profileRightTop">
          <div className='profileCover'>
            <img className='profileCoverImg' src={user.coverPicture? PF+user.coverPicture: PF+"person/noCover.png"} alt=''/>
            {/* <input type="file" name="file" id="file" onChange={handleFileChange} /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
             <img className='profileCoverUser' src={PF+"person/noAvatar.png"} alt=''/>
          </div>

          <div className='profileInfo'>
            <h4>{user.username}</h4>
            <span>{user.desc}</span>

          </div>
        </div>

        <div className="profileRightBottom">
           <Feed username={username} />
           <Rightbar user={user}/>
        </div>
        </div>
    </div>
  </div>
  )
}
