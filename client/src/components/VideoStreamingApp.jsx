import React, { useState } from "react";
import axios from "axios";
import { FaBookmark, FaEye, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import '../css/VideoCard.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoCard = ({ video }) => {
  const [hover, setHover] = useState(false);
  const nav = useNavigate();


  const watchNow = async () => {
    console.log("history");
    nav("/videoplayer", { state: video })
    window.scrollTo(0, 0);
  }
  const watchList = async (video) => {
    const userId =JSON.parse(localStorage.getItem("id")) ;
    console.log(userId);
    const newVideo = { ...video, userId: userId };
    console.log(newVideo);
    await axios.post("https://nzqqkzs6-5000.inc1.devtunnels.ms/insert", newVideo)
      .then((res) => toast.success("Video added to Watch List"))
      .catch((err) => toast.error("Already in the watchList"))
  }
  const user = localStorage.getItem("user");
  return (
    <div className="video-card rounded-1 pb-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <img
        onClick={() => watchNow()}
        src={video.thumbnail}
        alt="video thumbnail"
        className="thumbnail cards rounded-1"
      />
      <div className="video-info d-flex flex-column">
        <h4 className="ellipsis px-2 video-title">{video.tags}</h4>
        <div className="video-stats px-2 d-flex align-items-center">
          <span className="likes pe-3 ">
            <FaHeart className="text-danger" /> {video.likes}
          </span>
          <span className="views">
            <FaEye className="text-primary" /> {video.views}
          </span>
          <div className="overlay-buttons d-flex px-2 my-1">
            {user != null ? <button className="add-watchlist button rounded px-2 py-1" onClick={() => watchList(video)}><FaBookmark /></button> : ""}
          </div>
        </div>
      </div>


    </div>
  );
};

export default VideoCard;
