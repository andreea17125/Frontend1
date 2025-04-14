declare module 'leaflet' {
  export interface MapOptions {
    center?: [number, number];
    zoom?: number;
    style?: React.CSSProperties;
  }

  export interface TileLayerOptions {
    url: string;
    attribution?: string;
  }

  export class Map {
    constructor(element: string | HTMLElement, options?: MapOptions);
    addControl(control: any): void;
    removeControl(control: any): void;
    on(type: string, fn: (e: any) => void): void;
  }

  export class TileLayer {
    constructor(url: string, options?: TileLayerOptions);
  }

  export class Marker {
    constructor(latlng: [number, number], options?: any);
  }

  export class Popup {
    constructor(options?: any);
    setLatLng(latlng: [number, number]): this;
    setContent(content: string | HTMLElement): this;
    openOn(map: Map): this;
  }

  export namespace Icon {
    interface DefaultOptions {
      iconUrl?: string;
      iconRetinaUrl?: string;
      shadowUrl?: string;
      iconSize?: [number, number];
      iconAnchor?: [number, number];
      popupAnchor?: [number, number];
      shadowSize?: [number, number];
      shadowAnchor?: [number, number];
    }

    class Default {
      static prototype: any;
      static mergeOptions(options: DefaultOptions): void;
    }
  }
} 