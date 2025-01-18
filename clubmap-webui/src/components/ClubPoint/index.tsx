import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

import "./styles.css";
import MarkerPopup from "../MarkerPopup";
import { Club } from "../../types";
import { useMap } from "react-leaflet";

interface ClubPointProps {
  club: Club;
}

// it will be useful when i implement the club editing feature
export default function ClubPoint({ club }: ClubPointProps) {
  const map = useMap();

  return (
    <MarkerPopup
      position={club.geocode || map.getCenter()}
      options={{
        draggable: false,
        icon: club.escudo,
      }}
    >
      <div id="club-info-wrapper">
        <div id="club-info-header">
          <h2>{club.nome}</h2>
          <IconButton>
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
    </MarkerPopup>
  );
}
