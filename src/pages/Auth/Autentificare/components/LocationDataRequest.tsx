import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Building, Home, Mailbox } from "lucide-react";

const LocationDataRequest = ({handleLocationChange}) => {
  return (
    <div className="form-container">
      <form>
        <div className="form-group">
          <label>Country</label>
          <div className="input-container">
            <MapPin className="icon" />
            <input onChange={(e)=>handleLocationChange("country",e.target.value)}type="text" name="country" placeholder="Select your country" />
          </div>
        </div>

        <div className="form-group">
          <label>City</label>
          <div className="input-container">
            <Building className="icon" />
            <input onChange={(e)=>handleLocationChange("city",e.target.value)} type="text" name="city" placeholder="Select your city" />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <div className="input-container">
            <Home className="icon" />
            <input onChange={(e)=>handleLocationChange("address",e.target.value)} type="text" name="address" placeholder="Input your address" />
          </div>
        </div>

        <div className="form-group">
          <label>Postal Code</label>
          <div className="input-container">
            <Mailbox className="icon" />
            <input onChange={(e)=>handleLocationChange("postalCode",e.target.value)} type="text" name="postalCode" placeholder="Input your postal code" />
          </div>
        </div>

        <div className="terms-container">
          <input type="checkbox" name="agreeToTerms" />
          <span>I agree with Terms and Privacy</span>
        </div>

    
  </form>

  

  <div className="bottom-indicator"></div>
</div>
  )
}

export default LocationDataRequest