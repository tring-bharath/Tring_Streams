import React, { useEffect, useState } from 'react'
import '../css/videoplayer.css'
import { useLocation, useNavigate } from 'react-router-dom'
import VideoCard from './VideoStreamingApp'
import axios from 'axios'
import ReactPlayer from 'react-player'

const Videopreview = () => {
  const [hover, setHover] = useState(false);
  const location = useLocation();
  const video=location.state;
  
  let userId = JSON.parse(localStorage.getItem("id"));
  console.log(userId);
  
  const newVideo={...video,userId:userId};
  console.log("new",newVideo);
  axios.post("https://nzqqkzs6-5000.inc1.devtunnels.ms/insertHistory",newVideo)
  .then((res)=>console.log("res",res))
  .catch((err) => console.log(err)
  );
  const url = `http://localhost:5000/search?tag=${video.tags?.split(",")[0]}`;
  const navigate=useNavigate();
  const [videos, setVideos] = useState([]);
  const apicall = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        console.log(videos);
      })


  }
  const navToHome=()=>
  {
    navigate('/');
  }
  useEffect(() => {
    apicall();
  }, [])

  return (
    <div>
      {/* <video className='video-panel' src={location.state.videoURL} controls muted
        poster={location.state.thumbnail} /> */}
        <ReactPlayer url={location.state.videoURL} controls playing={true} pip={true} className='video-panel' height={"80vh"} width={"100%"} poster={location.state.thumbnail}/>
       <h1 className=' ms-4 mt-2'> {location.state.tags}</h1>
      <div className="navigate d-flex justify-content-between">
        <h2 className='p-4 ps-5 ms-2 '>More like this ...</h2>
        <button className='m-4 px-3 rounded-2 h6' onClick={()=>navToHome()}>Back to home</button>
      </div>
      <div className='d-flex flex-wrap video-cards align-items-center align-self-center justify-content-center'>
        {videos?.map((video) =>
        (<VideoCard video={video} />
        ))}
      </div>

    </div>

  )
}

export default Videopreview
