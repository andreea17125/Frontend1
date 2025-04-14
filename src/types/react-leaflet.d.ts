declare module 'react-leaflet' {
  import { ComponentType, ReactNode } from 'react';
  import { Map, TileLayer, Marker, Popup } from 'leaflet';

  export interface MapContainerProps {
    center: [number, number];
    zoom: number;
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  export interface TileLayerProps {
    url: string;
    attribution?: string;
  }

  export interface MarkerProps {
    position: [number, number];
    children?: ReactNode;
  }

  export interface PopupProps {
    children?: ReactNode;
  }

  export const MapContainer: ComponentType<MapContainerProps>;
  export const TileLayer: ComponentType<TileLayerProps>;
  export const Marker: ComponentType<MarkerProps>;
  export const Popup: ComponentType<PopupProps>;
}

declare module 'react-leaflet/hooks' {
  import { Map } from 'leaflet';

  export function useMap(): Map;
} 