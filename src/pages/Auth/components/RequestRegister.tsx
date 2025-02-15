import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpComponent.css';
import '@fontsource/acme';



const Register = () => {
    const [formData, setFormData] = useState({
        confirmPassword: '',
        username: '',
        email: '',
        password: '',
        agreeToTerms: false
      });

      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      };
    const navigate = useNavigate()
    const handleSubmit =async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await axios.post('https://localhost:7000/api/User/CreateUser', formData);
        console.log("response", response);
        if(response.data.statusCode === 201){
            navigate('/Login')
        }
     }
    
     
  return (
    <div className="signup-container">
    <div className="ellipse-top"></div>
    <div className="ellipse-bottom"></div>
    
    <div className="content">
      <h1 className="app-title">TerrainApp</h1>
   
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Input your email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Input your username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        


        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        <div className="terms-container">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
          />
          <span>I agree with Terms and Privacy</span>
        </div>

        <button type="submit" className="signup-button">
          Sign up
        </button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/Login">Login</Link>
      </p>

      <div className="bottom-indicator"></div>
    </div>
  </div>
  )
}

export default Register