import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet/hooks';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import './map.css';
import PropertyPopupForm from './PropertyPopupForm';
import { searchProperties, Property } from '../../services/propertyService';
import L from 'leaflet';
import PropertyForm from '../Form/PropertyForm';

// Fix for Leaflet icon issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MarkerData {
  id: number;
  position: [number, number];
  property: Property;
}

interface SearchLocation {
  position: [number, number];
  info: string;
}

interface SearchBarProps {
  setSearchedLocation: (location: SearchLocation | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchedLocation }) => {
  const map = useMap();

  React.useEffect(() => {
    // @ts-ignore - Ignoring type errors for leaflet-geosearch
    const provider = new OpenStreetMapProvider();
    // @ts-ignore - Ignoring type errors for leaflet-geosearch
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: false,
      autoClose: true,
      retainZoomLevel: false,
      searchLabel: 'Search for a location...',
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (result: { location: { x: number; y: number; label: string } }) => {
      const { x, y, label } = result.location;
      setSearchedLocation({ position: [y, x], info: label });
    });

    return () => map.removeControl(searchControl);
  }, [map, setSearchedLocation]);

  return null;
};

const LeafletMap: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [searchedLocation, setSearchedLocation] = useState<SearchLocation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([47.75, 26.1]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        console.log('Fetching properties from API...');
        const properties = await searchProperties();
        console.log('Properties fetched:', properties);
        
        if (properties.length === 0) {
          setError('No properties found. Please try again later.');
          setLoading(false);
          return;
        }
        
        // Convert properties to marker data format
        const markerData: MarkerData[] = properties.map(property => {
          // Ensure latitude and longitude are valid numbers
          const lat = typeof property.latitude === 'number' ? property.latitude : 47.75;
          const lng = typeof property.longitude === 'number' ? property.longitude : 26.1;
          
          return {
            id: property.id,
            position: [lat, lng],
            property: property
          };
        });
        
        setMarkers(markerData);
        
        // If we have properties, center the map on the first one
        if (markerData.length > 0) {
          setMapCenter(markerData[0].position);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="map-container">
      <PropertyForm/>
      <MapContainer
        center={mapCenter}
        zoom={10}
        style={{ width: '100%', height: '100vh' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <SearchBar setSearchedLocation={setSearchedLocation} />

        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>
              <PropertyPopupForm 
                property={marker.property}
                onClose={() => {
                 
                }}
              />
            </Popup>
          </Marker>
        ))}

        {searchedLocation && (
          <Marker position={searchedLocation.position}>
            <Popup>
              <h4>Search Result</h4>
              <p>{searchedLocation.info}</p>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {loading && (
        <div className="loading-indicator">
          Loading properties...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
