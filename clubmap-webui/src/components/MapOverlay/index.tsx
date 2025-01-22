import { Button } from "@mui/material";
import { useMap } from "react-leaflet";
import { clubStateStore } from "../../store/clubOperationStore";
import ClubPoint from "../ClubPoint";
import SearchInput from "../SearchInput";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "./styles.css";
import ClubForm from "../ClubForm";
import MarkerPopup from "../MarkerPopup";
import { useClubStore } from "../../store/clubStore";
import { useEffect, useRef } from "react";

export default function MapOverlay() {
  const map = useMap();
  const {
    currentOperation,
    resetState,
    editModeSetter,
    currentOperationLocation,
    setCurrentOperation,
  } = clubStateStore();
  const { loading } = useClubStore();
  const { clubs, error } = useClubStore();
  const divRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (divRef.current && error !== null) {
      divRef.current.classList.add("show-up");
      setTimeout(() => {
        if (divRef.current) divRef.current.classList.remove("show-up");
      }, 1000);
    }
  }, [error]);

  return (
    <>
      <div id="upper-div" className="overlay-map">
        <SearchInput onSelected={(e) => map.flyTo(e, 13)} />
      </div>

      {clubs.map((club) => (
        <ClubPoint key={club.id} club={club} />
      ))}

      {currentOperation === "create" && (
        <MarkerPopup
          position={currentOperationLocation || map.getCenter()}
          options={{ draggable: true }}
          // showPopupOnOpen={true} currently broken :(
        >
          <ClubForm onCancel={() => setCurrentOperation(null)} />
        </MarkerPopup>
      )}

      <div className={`noGood-div overlay-map`} ref={divRef}>
        {error && error > 0 ? (
          <ThumbUpAltIcon
            color="success"
            fontSize="large"
            sx={{
              fontSize: "10rem",
            }}
          />
        ) : (
          <HighlightOffIcon
            color="error"
            fontSize="large"
            sx={{
              fontSize: "10rem",
            }}
          />
        )}
      </div>

      <div id="lower-div" className="overlay-map">
        {currentOperation ? (
          <>
            <Button
              variant="contained"
              size="small"
              disabled={loading}
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
              disabled={loading}
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
            disabled={loading}
            onClick={() => setCurrentOperation("create")}
          >
            Add Club
          </Button>
        )}
      </div>
    </>
  );
}
