import axios, { AxiosHeaders } from "axios";
import { useState } from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

 const HistoryCard = ({ video, showCards }) => {
    const nav = useNavigate();
    const [hover, setHover] = useState(false);
  
    const remove = async (video) => {
      const deletedVideo = await axios.delete(`https://nzqqkzs6-5000.inc1.devtunnels.ms/removeFromHistory/${video._id}`)//http://localhost:5000/removeFromWatchList/${video._id}
      showCards();
    }
  
    const watchNow = () => {
      nav("/videoplayer", { state: video })
    }
    return (
      <div className="video-card rounded-2 bg-secondary" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <img src={video.thumbnail} alt="video thumbnail" className="thumbnail rounded-3" />
        <div className="video-info px-2">
          <h5 className='tag mt-1' style={{ textTransform: "capitalize" }}>{video.tags?.split(",")[0]}</h5>
          <div className="video-stats mb-2">
            <span className='fw-semibold me-2'><FaHeart size={12} className='text-danger' /> {video.likes} </span>
            <span className='fw-semibold'><FaEye size={13} className='' /> {video.views}</span>
          </div>
        </div>
        {hover && (
          <div className="overlay-buttons d-flex mb-2">
            <button className="watch-now btn rounded-1 bg-primary text-white px-2 mx-2 fw-semibold" onClick={() => watchNow()}>Watch Now</button>
            <button className="add-watchlist btn bg-danger text-white fw-semibold" onClick={() => remove(video)}>Remove</button>
          </div>
        )}
      </div>
    )
  
  }

  export default HistoryCard