import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './PropertyForm.css'; 
import axios from 'axios';

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    HbathMin: '',
    HbathMax: '',
    PropType: '',
    YearBuiltMin: '',
    YearBuiltMax: '',
    RoomsMin: '',
    RoomsMax: '',
    SalePriceMin: '',
    SalePriceMax: '',
  });
  const [propTypes, setPropTypes] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    const response = await axios.post('https://localhost:7000/api/Terrain/SearchProperties',formData)
    console.log('API Response:', response.data);
 
  };
  const handleFetchPropTypes = async() => {

    const response = await axios.get('https://localhost:7000/api/Terrain/GetPropertyNames');
    console.log('API Response:', response.data);
    setPropTypes(response.data.propertyTypeDto);
  }
  useEffect(() => {
    handleFetchPropTypes();
  }
, []);
      


  return (
    <div className="property-form-container">
      <form className="property-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Property Search Form</h3>

        <label className="form-label form-proptype">PropType:</label>
        <select
          name="propType"
          value={formData.PropType}
          onChange={handleChange}
          className="form-input form-proptype"
        >
          <option value="">Select PropType</option>
          {propTypes.filter(x => x.propType.length).map((propType,index) => (
            <option key={index} value={propType.propType}>
              {propType.propType}
            </option>
          ))}
        </select>
        
        
        <label className="form-label">Hbath (Min - Max):</label>
        <div className="form-group">
          <input
            type="number"
            name="hBath_Start"
            placeholder="Min"
            value={formData.HbathMin}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="number"
            name="hBath_End"
            placeholder="Max"
            value={formData.HbathMax}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <label className="form-label">Year Built (Min - Max):</label>
        <div className="form-group">
          <input
            type="number"
            name="year_Built_Start"
            placeholder="Min"
            value={formData.YearBuiltMin}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="number"
            name="year_Built_End"
            placeholder="Max"
            value={formData.YearBuiltMax}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <label className="form-label">Rooms (Min - Max):</label>
        <div className="form-group">
          <input
            type="number"
            name="rooms_Start"
            placeholder="Min"
            value={formData.RoomsMin}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="number"
            name="rooms_End"
            placeholder="Max"
            value={formData.RoomsMax}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <label className="form-label">Sale Price (Min - Max):</label>
        <div className="form-group">
          <input
            type="number"
            name="sale_Price_Start"
            placeholder="Min"
            value={formData.SalePriceMin}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="number"
            name="sale_Price_End"
            placeholder="Max"
            value={formData.SalePriceMax}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="form-button">Search</button>
      </form>
    </div>
  );
};

export default PropertyForm;
