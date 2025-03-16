import React, { useEffect, useState } from 'react'
import { useAsyncError, useNavigate, useSearchParams } from 'react-router-dom';
import '../../css/Dashboard.css'
import Carousel from 'react-bootstrap/Carousel';
import VideoCard from '../../components/VideoStreamingApp';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { datalist } from 'framer-motion/client';
import History from './history';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const url = import.meta.env.VITE_API_URL;
  const [page,setPage]=useState(1);
  const [hasMore, setHasMore] = useState(true);
  const nav=useNavigate();
  // const url = "https://nzqqkzs6-5000.inc1.devtunnels.ms/getAllVideos";//https://pixabay.com/api/videos/?key=49160670-8b09c7d4f9c7bed1e8a624b6b&q=nature

  const [videos, setVideos] = useState([]);
  const [carousel,setCarousel]=useState([]);
  const apicall = async () => {
    try {
      const res = await axios.get(`${url}/video/getAllVideos?page=${page}`);
      const carouselData = await axios.get(`${url}/video/carousel`);
      const data = res.data;
      
      setCarousel(carouselData.data);
      if (data.length < 20) setHasMore(false);

      setVideos((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setHasMore(false);
    }
  }
  const watchNow=(video)=>
    {
      nav("/videoplayer",{state:video})
    }
  useEffect(() => {
  }, [videos])
  useEffect(() => {
    apicall();
  }, [])
  return (
    <div className="carousel-container">
      <ToastContainer/>
      <Carousel wrap={true} interval={2000} className='mb-3'>
        {carousel?.map((video) => (
          <Carousel.Item>
            <img
              src={video?.thumbnail}
              alt="Banner"
              className="banner-image"
            />
            <Carousel.Caption className='banner'>
              <h1 className="banner-title align-self-start">{video.tags}</h1>
              <div className="banner-footer d-flex align-items-center">
                <button className='px-3 py-2 rounded-1 me-3 mt-3 carousel-btn ' onClick={()=>watchNow(video)}>Watch Now</button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <History/>
      <InfiniteScroll
      dataLength={videos.length}
      next={apicall}
      hasMore={hasMore}
      loader={<h4>Loading Videos</h4>}
      className='infinite-scroll'
      >
        <h1 className='ms-3'>All Videos</h1>
      <div className='d-flex flex-wrap video-cards justify-content-center'>
        
        {videos.map((video) => (<VideoCard video={video} />))}
      </div>
      </InfiniteScroll>
    </div>
  )
}


export default Dashboard
