import React from 'react'
import { useNavigate } from 'react-router';

const Logout = () => {
    const navigate = useNavigate();
  return (
    <button style={{top:"2em",right:"2em",position:"absolute"}} onClick={() => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      navigate('/Login')
    }
}>
     Logout


    </button>
  )
}


export default Logout