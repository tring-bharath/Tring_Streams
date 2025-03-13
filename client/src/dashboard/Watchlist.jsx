import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEye, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const Watchlist = () => {
  const [videos, setVideos] = useState([]);
  const userId=JSON.parse(localStorage.getItem("id"));
  
  const showCards = async () => {
    const res = await axios.get(`https://nzqqkzs6-5000.inc1.devtunnels.ms/watchList/${userId}`)//http://localhost:5000/watchList
    setVideos(res.data)
    console.log(res.data);
    
  }

  const user=JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    showCards();
  }, [])
  
  return (
    <div className="container w-100">
      {user!=null?
    <div className='userAvailable'>
      <p className='h1 ms-2 mt-2'>Watch List</p>
      <div className='d-flex px-2 flex-wrap video-cards mt-4'>
        {videos.map((video) => (<WatchListCard video={video} showCards={showCards} />))}
      </div>
    </div>
    :
        <div className="userUnavailable w-100 d-flex justify-content-center align-items-center h3 h-100  ">
          Login to save and watch videos
        </div>
}
    </div>
  )
}

const WatchListCard = ({ video, showCards }) => {
  const nav = useNavigate();
  const [hover, setHover] = useState(false);

  const remove = async (video) => {
    const deletedVideo = await axios.delete(`https://nzqqkzs6-5000.inc1.devtunnels.ms/removeFromWatchList/${video._id}`)//http://localhost:5000/removeFromWatchList/${video._id}
    showCards();
  }

  const watchNow = (Videourl, tag, thumbnail) => {
    nav("/videoplayer", { state: { Videourl, tag, thumbnail } })
  }
  return (
    <div className="video-card rounded-2 bg-secondary" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <img src={video.thumbnail} alt="video thumbnail" className="thumbnail rounded-3" />
      <div className="video-info px-2">
        <h5 className='tag mt-1' style={{ textTransform: "capitalize" }}>{video.tags.split(",")[0]}</h5>
        <div className="video-stats mb-2">
          <span className='fw-semibold me-2'><FaHeart size={12} className='text-danger' /> {video.likes} </span>
          <span className='fw-semibold'><FaEye size={13} className='' /> {video.views}</span>
        </div>
      </div>
      {hover && (
        <div className="overlay-buttons d-flex mb-2">
          <button className="watch-now btn rounded-1 bg-primary  px-2 mx-2 fw-semibold" onClick={() => watchNow(video.videoURL, video.tags, video.thumbnail)}>Watch Now</button>
          <button className="add-watchlist btn bg-danger  fw-semibold" onClick={() => remove(video)}>Remove</button>
        </div>
      )}
    </div>
  )

}
export default Watchlist
