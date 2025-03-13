import React, { useContext, useEffect, useState } from 'react'
import HistoryCard from '../../components/HistoryCard';
import { ProfileName } from '../../routes/AppRoutes';
import axios from 'axios';
import '../../css/History.css'

const History = () => {
      const { userName, setUsername } = useContext(ProfileName);
    const [videos, setVideos] = useState([]);
  const userId =JSON.parse( localStorage.getItem("id"));
    console.log(`https://nzqqkzs6-5000.inc1.devtunnels.ms/history/${userId}`);
    
    const showCards = async () => {
        const res = await axios.get(`https://nzqqkzs6-5000.inc1.devtunnels.ms/history/${userId}`)//http://localhost:5000/watchList
        console.log("hi");
      setVideos(res.data)
    }
  
    useEffect(() => {
      showCards();
    }, [])
  return (
    <div className='history-container'>
        {/* <h1>history</h1> */}
      <div className='px-3 history-cards'>
            {videos.map((video) => (<HistoryCard video={video} showCards={showCards}/>))}{/* */}
          </div>
    </div>
  )
}

export default History
