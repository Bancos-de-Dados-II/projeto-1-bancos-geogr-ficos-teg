import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";

import { mockClubs } from "./mock";

import "./App.css";
import "leaflet/dist/leaflet.css";
import ClubPoint from "./components/ClubPoint";

interface VerticalBoundsProps {
  minLat: number;
  maxLat: number;
}

// put the user back in bounds if they drag to the grey area
function VerticalBounds({ minLat, maxLat }: VerticalBoundsProps) {
  const map = useMap();

  useEffect(() => {
    const enforceVerticalBounds = () => {
      const center = map.getCenter();
      const clampedLat = Math.max(minLat, Math.min(maxLat, center.lat));
      if (center.lat !== clampedLat) {
        map.setView([clampedLat, center.lng], map.getZoom(), {
          animate: false,
        });
      }
    };

    map.on("drag", enforceVerticalBounds);

    return () => {
      map.off("drag", enforceVerticalBounds);
    };
  }, [map, minLat, maxLat]);

  return null;
}

export default function App() {
  return (
    <div className="wrapper">
      <MapContainer
        center={[-20, -50]}
        zoom={3}
        minZoom={2}
        maxZoom={18}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mockClubs.map((club) => (
          <ClubPoint key={club.id} club={club} />
        ))}

        <VerticalBounds minLat={-40} maxLat={40} />
      </MapContainer>
    </div>
  );
}
