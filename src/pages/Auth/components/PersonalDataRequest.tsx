import React from 'react'
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpComponent.css';
import '@fontsource/acme';


const PersonalDataRequest = () => {
  return (
     <div>
    <form >
    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="Input your email"
        
      />
    </div>

    <div className="form-group">
      <label>Username</label>
      <input
        type="text"
        name="username"
        placeholder="Input your username"
        
      />
    </div>

    <div className="form-group">
      <label>Role</label>
      <input
        type="text"
        name="role"
        placeholder="Select your role"
        
      />
    </div>
    
    <div className="form-group">
      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="********"
      
      />
    </div>

    <div className="form-group">
      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="********"
       
      />
    </div>

    <div className="terms-container">
      <input
        type="checkbox"
        name="agreeToTerms"
        
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

  )
}

export default PersonalDataRequest