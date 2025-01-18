import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

import "./styles.css";
import MarkerPopup from "../MarkerPopup";
import { ClubWithIcon } from "../../types";
import { useEffect, useState } from "react";
import ClubForm from "../ClubForm";
import { clubStateStore } from "../../store/clubOperationStore";
import { LatLng } from "leaflet";

interface ClubPointProps {
  club: ClubWithIcon;
}

// it will be useful when i implement the club editing feature
export default function ClubPoint({ club }: ClubPointProps) {
  const {
    setCurrentOperation,
    setCurrentOperationLocation,
    updateEditModeSetter,
    resetState,
    currentOperation,
  } = clubStateStore();

  const [isEditing, setIsEditing] = useState(false);
  const [position, setPosition] = useState<LatLng>(club.geocode);

  function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setCurrentOperation("edit");
    setCurrentOperationLocation(club.geocode);
    updateEditModeSetter(setIsEditing);
    setIsEditing(true);
  }

  function handleCancel(e?: React.MouseEvent<HTMLButtonElement>) {
    if (e) e.stopPropagation();
    setIsEditing(false);
    resetState();
    setPosition(new LatLng(club.geocode.lat, club.geocode.lng));
  }

  useEffect(() => {
    if (!isEditing) setPosition(new LatLng(club.geocode.lat, club.geocode.lng));
  }, [isEditing, club.geocode]);

  return (
    <MarkerPopup
      position={position}
      options={{
        draggable: isEditing,
        icon: club.escudo,
      }}
    >
      {isEditing ? (
        <ClubForm
          onCancel={handleCancel}
          club={{ ...club, escudo: undefined }}
        />
      ) : (
        <div id="club-info-wrapper">
          <div id="club-info-header">
            <h2>{club.nome}</h2>
            <IconButton onClick={handleEdit} disabled={!!currentOperation}>
              <EditIcon />
            </IconButton>
          </div>
          <ul id="club-info-attributes">
            <li>
              Fundação: <span id="anoFundacao">{club.anoFundacao}</span>
            </li>
            <li>
              Estádio: <span id="estadio">{club.estadio}</span>
            </li>
            <li>
              Rival:
              <span id="rival"> {club.principalRival || "Não definido"}</span>
            </li>
            <li>
              Presidente: <span id="presidente">{club.presidente}</span>
            </li>
            <li>
              Tecnico: <span id="tecnico">{club.tecnico}</span>
            </li>
            <li>
              Títulos:
              <ul id="titulos">
                {club.titulos.map((titulo, index) => (
                  <li key={index}>
                    {titulo?.nome}: {titulo?.conquistas}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      )}
    </MarkerPopup>
  );
}
