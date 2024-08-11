import React, { useState, useRef } from "react";
import "./Share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import Cancel from "@mui/icons-material/Cancel";
import TagFacesIcon from "@mui/icons-material/TagFaces";

export default function Share() {
  // Dummy user data
  const user = {
    _id: 1,
    username: "JohnDoe",
    profilePicture: "person/noAvatar.png",
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      img: file ? Date.now() + file.name : "",
    };
    console.log("Post data:", newPost);

    // Simulate a file upload and post submission
    if (file) {
      // Simulate file upload
      console.log("File to upload:", file);
    }

    // Simulate post submission
    console.log("New post submitted:", newPost);
    window.location.reload(); // Refresh the page (you may handle this differently in real scenarios)
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's on your mind, " + user.username + "?"}
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file">
              <PermMediaIcon style={{ color: "red" }} className="shareIcons" />
              <span>Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div>
              <LabelIcon style={{ color: "blue" }} className="shareIcons" />
              <span>Tag</span>
            </div>
            <div>
              <RoomIcon style={{ color: "green" }} className="shareIcons" />
              <span>Location</span>
            </div>
            <div>
              <TagFacesIcon
                style={{ color: "#FFEB3B" }}
                className="shareIcons"
              />
              <span>Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
