import React, { useEffect, useState, useRef } from "react";
import { MapPin, Building, Home, Mailbox } from "lucide-react";
import axios from "axios";
import "./SignUpComponent.css";

const LocationDataRequest = ({ handleLocationChange }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [openCountry, setOpenCountry] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [countryInput, setCountryInput] = useState("");
  const [cityInput, setCityInput] = useState("");

  const countryDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://localhost:7000/api/User/FetchCountries");
        console.log("Countries API response:", response.data);

        if (response.data?.countries && Array.isArray(response.data.countries)) {
          const countryNames = response.data.countries.map((country) => country.name);
          setCountries(countryNames);
          setFilteredCountries(countryNames);
        } else {
          setCountries([]);
          setFilteredCountries([]);
        }
      } catch (error) {
        console.error("Error fetching countries from backend:", error);
        setCountries([]);
        setFilteredCountries([]);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchCities(selectedCountry);
    } else {
      setCities([]);
      setFilteredCities([]);
      setSelectedCity("");
      setCityInput("");
    }
  }, [selectedCountry]);

  const fetchCities = async (country) => {
    try {
      const response = await axios.get(`https://localhost:7000/api/User/FetchCities/${country}`);
      console.log("Cities API response:", response.data);

      if (response.data?.cities && Array.isArray(response.data.cities)) {
        setCities(response.data.cities);
        setFilteredCities(response.data.cities);
      } else {
        setCities([]);
        setFilteredCities([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
      setFilteredCities([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setOpenCountry(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setOpenCity(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountryInputChange = (e) => {
    const value = e.target.value || ""; 
    setCountryInput(value);
    setFilteredCountries(countries.filter((country) => country.toLowerCase().includes(value.toLowerCase())));
  };

  const handleCityInputChange = (e) => {
    const value = e.target.value || "";
    setCityInput(value);
    setFilteredCities(cities.filter((city) => city.toLowerCase().includes(value.toLowerCase())));
  };

  return (
    <div className="form-container">
  
      <div className="form-group" ref={countryDropdownRef} style={{ position: "relative" }}>
        <label>Country</label>
        <div className="input-container">
          <MapPin className="icon" />
          <input
            type="text"
            value={countryInput || ""} 
            placeholder="Select your country"
            onFocus={() => setOpenCountry(true)}
            onChange={handleCountryInputChange}
          />
        </div>
        {openCountry && (
          <div className="dropdown-menu">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedCountry(country);
                    setCountryInput(country);
                    handleLocationChange("country", country);
                    setOpenCountry(false);
                  }}
                >
                  {country}
                </div>
              ))
            ) : (
              <div className="dropdown-item disabled">No countries found</div>
            )}
          </div>
        )}
      </div>


      <div className="form-group" ref={cityDropdownRef} style={{ position: "relative" }}>
        <label>City</label>
        <div className="input-container">
          <Building className="icon" />
          <input
            type="text"
            value={cityInput || ""} 
            placeholder="Select your city"
            onFocus={() => setOpenCity(true)}
            onChange={handleCityInputChange}
          />
        </div>
        {openCity && (
          <div className="dropdown-menu">
            {filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedCity(city);
                    setCityInput(city);
                    handleLocationChange("city", city);
                    setOpenCity(false);
                  }}
                >
                  {city}
                </div>
              ))
            ) : (
              <div className="dropdown-item disabled">No cities available</div>
            )}
          </div>
        )}
      </div>


      <div className="form-group">
        <label>Address</label>
        <div className="input-container">
          <Home className="icon" />
          <input onChange={(e) => handleLocationChange("address", e.target.value)} type="text" placeholder="Input your address" />
        </div>
      </div>


      <div className="form-group">
        <label>Postal Code</label>
        <div className="input-container">
          <Mailbox className="icon" />
          <input onChange={(e) => handleLocationChange("postalCode", e.target.value)} type="text" placeholder="Input your postal code" />
        </div>
      </div>
    </div>
  );
};

export default LocationDataRequest;
