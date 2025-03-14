import React, { useContext, useEffect, useState } from 'react'
import HistoryCard from '../../components/HistoryCard';
import { ProfileName } from '../../routes/AppRoutes';
import axios from 'axios';
import '../../css/History.css'
;

const History = () => {
  const url = import.meta.env.VITE_API_URL;
      const { userName, setUsername } = useContext(ProfileName);
    const [videos, setVideos] = useState([]);
  const userId =JSON.parse( localStorage.getItem("id"));
    console.log(`${url}/history/${userId}`);
    
    const showCards = async () => {
      const res = await axios.get(`${url}/history/${userId}`)
      setVideos(res.data);
    }
  
    useEffect(() => {
      showCards();
    }, [])
  return (
    <div className='history-container'>
        {videos.length&&<h1 className='ms-3'>History</h1>}
      <div className='px-3 mt-1 history-cards'>
            {videos?.map((video) => (<HistoryCard video={video} showCards={showCards}/>))}{/* */}
          </div>
    </div>
  )
}

export default History
