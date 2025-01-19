import { Button } from "@mui/material";
import { useMap } from "react-leaflet";
import { mockClubs } from "../../mock";
import { clubStateStore } from "../../store/clubOperationStore";
import ClubPoint from "../ClubPoint";
import SearchInput from "../SearchInput";

import "./styles.css";
import ClubForm from "../ClubForm";
import MarkerPopup from "../MarkerPopup";

export default function MapOverlay() {
  const map = useMap();
  const {
    currentOperation,
    resetState,
    editModeSetter,
    currentOperationLocation,
    setCurrentOperation,
  } = clubStateStore();

  return (
    <>
      <div id="upper-div" className="overlay-map">
        <SearchInput onSelected={(e) => map.flyTo(e, 13)} />
      </div>

      {mockClubs.map((club) => (
        <ClubPoint key={club.id} club={club} />
      ))}

      {currentOperation === "create" && (
        <MarkerPopup
          position={currentOperationLocation || map.getCenter()}
          options={{ draggable: true }}
          // showPopupOnOpen={true} currently broken :(
        >
          <ClubForm onCancel={() => setCurrentOperation(null)}/>
        </MarkerPopup>
      )}

      <div id="lower-div" className="overlay-map">
        {currentOperation ? (
          <>
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
          </>
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => setCurrentOperation("create")}
          >
            Add Club
          </Button>
        )}
      </div>
    </>
  );
}
