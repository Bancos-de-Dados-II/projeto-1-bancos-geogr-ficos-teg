import { Button } from "@mui/material";
import { LatLng } from "leaflet";
import { useMap } from "react-leaflet";
import { mockClubs } from "../../mock";
import { clubStateStore } from "../../store/clubOperationStore";
import ClubPoint from "../ClubPoint";
import SearchInput from "../SearchInput";

import "./styles.css";

export default function MapOverlay() {
  const {
    currentOperation,
    resetState,
    editModeSetter,
    currentOperationLocation,
  } = clubStateStore();

  const map = useMap();

  function onSelected(coo: LatLng) {
    map.flyTo(coo, 13);
  }

  return (
    <>
      <div id="upper-div" className="overlay-map">
        <SearchInput onSelected={onSelected} />
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
                map.flyTo(currentOperationLocation);
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
    </>
  );
}
