import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './components/LoginComponent.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Login Details:', { email, password });

    try {
      const response = await axios.post('https://localhost:7000/Login', { email, password });
      console.log('response', response.data);

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      navigate('/Home');
    } catch (error) {
      console.error('Login failed:', error);
     
    }
  };

  return (
    <div className="login-container">
      <div className="background-ellipse top"></div>
      <div className="background-ellipse bottom"></div>
      
      <div className="content">
        <h1 className="app-title">TerrainApp</h1>
       
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Input your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        
        <p className="signup-text">
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </div>
      
      <div className="bottom-indicator"></div>
    </div>
  );
}

export default Login;
