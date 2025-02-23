import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate("/Login");
        }
    }, [])
  return (
    <div>Home</div>
  )
}

export default Home