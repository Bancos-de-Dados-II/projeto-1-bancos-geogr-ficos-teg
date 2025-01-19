import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";

import { mockClubs } from "./mock";

import "./App.css";
import "leaflet/dist/leaflet.css";
import ClubPoint from "./components/ClubPoint";
import { Button } from "@mui/material";
import { clubStateStore } from "./store/clubOperationStore";
import CustomizedInputBase from "./components/SearchInput";
import { LatLng } from "leaflet";

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
  const mapRef = useRef<L.Map | null>(null);

  function onSelected(coo: LatLng) {
    mapRef.current?.flyTo(coo, 13);
  }

  const {
    currentOperation,
    resetState,
    editModeSetter,
    currentOperationLocation,
  } = clubStateStore();

  return (
    <div className="wrapper">
      <MapContainer
        center={[-20, -50]}
        zoom={3}
        minZoom={2}
        maxZoom={18}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <div id="upper-div" className="overlay-map">
          <CustomizedInputBase onSelected={onSelected} />
        </div>

        {mockClubs.map((club) => (
          <ClubPoint key={club.id} club={club} />
        ))}

        {currentOperation && (
          <div id="lower-div" className="overlay-map">
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                if (currentOperationLocation) {
                  mapRef.current?.panTo(currentOperationLocation);
                }
              }}
            >
              Move to
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => {
                if (editModeSetter) editModeSetter(false);
                resetState();
              }}
            >
              Cancel
            </Button>
          </div>
        )}

        <VerticalBounds minLat={-40} maxLat={40} />
      </MapContainer>
    </div>
  );
}
