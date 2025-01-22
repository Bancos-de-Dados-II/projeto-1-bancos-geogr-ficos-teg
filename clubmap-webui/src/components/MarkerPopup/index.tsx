import { useState, useRef, useEffect } from "react";
import { Popup, Marker, useMap } from "react-leaflet";
import { LatLng, MarkerOptions } from "leaflet";
import { clubStateStore } from "../../store/clubOperationStore";

interface MarkerCompProps {
  showPopupOnOpen?: boolean;
  position: LatLng;
  children?: React.ReactNode;
  options?: MarkerOptions;
}

export default function MarkerPopup({
  position,
  showPopupOnOpen,
  children,
  options,
}: MarkerCompProps) {
  const { currentOperation, setCurrentOperationLocation } = clubStateStore();

  const [refReady, setRefReady] = useState(false);
  const markerRef = useRef<L.Marker | null>(null);
  const popupRef = useRef<L.Popup | null>(null);

  const map = useMap();

  // it will cause an error if map is not ready
  useEffect(() => {
    if (refReady && popupRef.current && showPopupOnOpen)
      popupRef.current.openOn(map);
  }, [refReady, map, showPopupOnOpen]);

  // if the operation value on the store is defined, update the club
  // location of the club in the store with the new location of the marker
  function updatePosition() {
    if (currentOperation && markerRef.current) {
      setCurrentOperationLocation(markerRef.current.getLatLng());
    }
  }

  return (
    <Marker
      position={position}
      ref={markerRef}
      {...options}
      eventHandlers={{
        dragend: updatePosition,
      }}
    >
      <Popup
        ref={(r) => {
          popupRef.current = r;
          if (r) setRefReady(true);
        }}
        closeButton={false}
      >
        {children}
      </Popup>
    </Marker>
  );
}
