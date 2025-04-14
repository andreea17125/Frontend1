import React from 'react';
import './PropertyPopupForm.css';
import { Property } from '../../services/propertyService';

interface PropertyPopupFormProps {
  property: Property;
  onClose: () => void;
}

const PropertyPopupForm: React.FC<PropertyPopupFormProps> = ({ property, onClose }) => {
  // Format price with currency symbol and thousands separator
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Format area with unit
  const formatArea = (area: number) => {
    return `${area} mp`;
  };

  return (
    <div className="property-popup">
      <button className="close-button" onClick={onClose}>×</button>
      <div className="property-content">
        {property.imageUrl && (
          <div className="property-image">
            <img src={property.imageUrl} alt={property.title} />
          </div>
        )}
        <div className="property-details">
          <h3>{property.title}</h3>
          <p className="price">{formatPrice(property.price)}</p>
          <p className="location">{property.location}</p>
          <div className="property-features">
            <span>{property.bedrooms} camere</span>
            <span>{property.bathrooms} băi</span>
            <span>{formatArea(property.area)}</span>
          </div>
          <p className="description">{property.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyPopupForm; 