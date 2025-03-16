import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEye, FaHeart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const Watchlist = () => {
  const url = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);
  const userId=JSON.parse(localStorage.getItem("id"));
  
  const showCards = async () => {
    const res = await axios.get(`${url}/video/watchList/${userId}`)
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
        <div className="userUnavailable w-100 d-flex justify-content-center align-items-center h3 h-100  "> Login to save and watch videos </div>
}
    </div>
  )
}

const WatchListCard = ({ video, showCards }) => {
  const url = import.meta.env.VITE_API_URL;
  const nav = useNavigate();
  const [hover, setHover] = useState(false);

  const remove = async (video) => {
    const deletedVideo = await axios.delete(`${url}/video/removeFromWatchList/${video._id}`)
    showCards();
  }

  const watchNow = (Video) => {
    console.log(Video);
    nav("/videoplayer", { state: Video  })
  }
  return (
    <div className="video-card rounded-2" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <img src={video.thumbnail} alt="video thumbnail" className="thumbnail rounded-3" onClick={() => watchNow(video)}/>
      <div className="video-info px-2">
        <h5 className='tag mt-1' style={{ textTransform: "capitalize" }}>{video.tags.split(",")[0]}</h5>
        <div className="video-stats d-flex align-items-center mb-2">
          <span className='fw-semibold me-3 '><FaHeart size={12} className='text-danger' /> {video.likes} </span>
          <span className='fw-semibold me-3'><FaEye size={13} className='' /> {video.views}</span>
          <button className="add-watchlist btn bg-danger mx-2 fw-semibold align-self-center" onClick={() => remove(video)}><FaTrash className='text-white'/></button>
        </div>
      </div>
      
    </div>
  )

}
export default Watchlist
