import { useState, useRef, useEffect } from "react";
import { Popup, Marker, useMap } from "react-leaflet";
import { LatLng, MarkerOptions } from "leaflet";

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
  const [refReady, setRefReady] = useState(false);
  const markerRef = useRef<L.Marker | null>(null);
  const popupRef = useRef<L.Popup | null>(null);

  const map = useMap();

  // it will cause an error if map is not ready
  useEffect(() => {
    if (refReady && popupRef.current && showPopupOnOpen) {
      popupRef.current.openOn(map);
    }
  }, [refReady, map, showPopupOnOpen]);

  return (
    <Marker position={position} ref={markerRef} {...options}>
      <Popup
        ref={(r) => {
          popupRef.current = r;
          setRefReady(true);
        }}
        closeButton={false}
      >
        {children}
      </Popup>
    </Marker>
  );
}
