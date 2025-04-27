import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function OneLocationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [0, 0],
      zoom: 2,
    });
  }, []);

  const goToCoordinates = (parsedLat: number, parsedLng: number) => {
    if (!map.current) return;
  
    map.current.flyTo({
      center: [parsedLng, parsedLat],
      zoom: 14,
      speed: 1.2,
    });
  
    setTimeout(() => {
      map.current?.easeTo({
        center: [parsedLng + 0.001, parsedLat + 0.001],
        duration: 500,
        easing: (t) => t, // mișcare constantă
      });
      setTimeout(() => {
        map.current?.easeTo({
          center: [parsedLng, parsedLat],
          duration: 500,
          easing: (t) => t,
        });
      }, 500);
    }, 1200);
  
    if (markerRef.current) {
      markerRef.current.remove();
    }
  
    const popupHTML = `
      <div style="text-align: center;">
        ${city ? `<strong>${city}</strong><br/>` : ""}
        ${street || number ? `${street} ${number}<br/>` : ""}
        ${postalCode ? `${postalCode}<br/>` : ""}
        <small>(${parsedLat.toFixed(4)}, ${parsedLng.toFixed(4)})</small>
      </div>
    `;
  
    const newMarker = new maplibregl.Marker()
      .setLngLat([parsedLng, parsedLat])
      .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(popupHTML))
      .addTo(map.current);
  
    markerRef.current = newMarker;
  };
  

  const handleGoToLocation = async () => {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
      goToCoordinates(parsedLat, parsedLng);
      return;
    }

    if (city) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`
        );
        const data = await response.json();
        if (data.length > 0) {
          const fetchedLat = parseFloat(data[0].lat);
          const fetchedLng = parseFloat(data[0].lon);
          goToCoordinates(fetchedLat, fetchedLng);
        } else {
          alert("Orașul nu a fost găsit! Verifică scrierea.");
        }
      } catch (error) {
        console.error("Eroare la căutarea orașului:", error);
        alert("A apărut o eroare la căutare!");
      }
    } else {
      alert("Introduceți fie coordonate, fie un oraș!");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", gap: "20px" }}>
      {/* FORMULAR */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Oraș (opțional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "10px", width: "200px" }}
        />
        <input
          type="text"
          placeholder="Stradă (opțional)"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          style={{ padding: "10px", width: "200px" }}
        />
        <input
          type="text"
          placeholder="Număr (opțional)"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          style={{ padding: "10px", width: "100px" }}
        />
        <input
          type="text"
          placeholder="Cod Poștal (opțional)"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          style={{ padding: "10px", width: "150px" }}
        />
        <input
          type="text"
          placeholder="Latitudine*"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          style={{ padding: "10px", width: "150px" }}
        />
        <input
          type="text"
          placeholder="Longitudine*"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          style={{ padding: "10px", width: "150px" }}
        />
        <button
          onClick={handleGoToLocation}
          style={{ backgroundColor: "#2ecc71", color: "white", padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", height: "50px" }}
        >
          📍 Mergi la locație
        </button>
      </div>

      {/* HARTA */}
      <div ref={mapContainer} style={{ width: "90%", height: "600px" }} />
    </div>
  );
}
