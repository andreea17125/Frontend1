import axios from 'axios';

const API_BASE_URL = 'https://localhost:7000/api/Terrain/SearchProperties';

export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl?: string;
  latitude: number;
  longitude: number;
}

export const searchProperties = async (searchParams?: any): Promise<Property[]> => {
  try {
    console.log('Fetching properties from:', `${API_BASE_URL}`);
    
    const response = await axios.post(`${API_BASE_URL}`, {
      body: searchParams,
     
    });
    
    console.log('API Response:', response.data);
    
    // If the API returns an array directly
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    // If the API returns an object with a data property
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    // If the API returns an object with a different structure
    if (response.data && typeof response.data === 'object') {
      // Try to find an array property in the response
      const arrayProperty = Object.values(response.data).find(value => Array.isArray(value));
      if (arrayProperty) {
        return arrayProperty as Property[];
      }
    }
    
    console.warn('Unexpected API response format:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}; 