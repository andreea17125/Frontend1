import React from 'react'
import { Link } from 'react-router-dom'

const LocationDataRequest = () => {
  return (
    <div>
    <form >
    <div className="form-group">
      <label>Country</label>
      <input
        type="text"
        name="country"
        placeholder="Select your country"
        
      />
    </div>

    <div className="form-group">
      <label>City</label>
      <input
        type="text"
        name="city"
        placeholder="Select your city"
        
      />
    </div>
    
    <div className="form-group">
      <label>Adress</label>
      <input
        type="text"
        name="adress"
        placeholder="Input your adress"
      
      />
    </div>

   
   
    <div className="form-group">
      <label>Postal Code</label>
      <input
        type="text"
        name="postalCode"
        placeholder="Input your postal code"
        
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

export default LocationDataRequest