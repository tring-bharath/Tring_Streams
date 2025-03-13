import React from 'react'
import { useNavigate } from 'react-router-dom';

const Loggedout = () => {

    const navigate = useNavigate();

    const loginNavigate = () => {
        navigate("/registration");
      }
    
  return (
    <div className='d-flex flex-column justify-content-center align-self-center'>
          <h3>Login to access the history</h3>
          <div className="btn">
            <button className='btn bg-primary text-white' onClick={loginNavigate}>Login</button>
          </div>
        </div>
  )
}

export default Loggedout
