import { useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { LatLng } from "leaflet";
import { CustomInputComponent } from "./CustomInput";

import "./styles.css";
import { useClubStore } from "../../store/clubStore";

const filter = createFilterOptions({
  limit: 50,
  matchFrom: "start",
  ignoreCase: true,
  ignoreAccents: true,
  trim: true,
});

interface SearchInputProps {
  onSelected: (coo: LatLng) => void;
}

export default function SearchInput({ onSelected }: SearchInputProps) {
  const [value, setValue] = useState<string>("");
  const { loading, clubs } = useClubStore();

  return (
    <Autocomplete
      disabled={loading}
      id="size-small-standard"
      className="search-input-container"
      value={value}
      onInputChange={(_, val) => setValue(val)}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "70%",
        maxWidth: 400,
      }}
      onChange={(_, newValue) => {
        setValue("");
        onSelected(newValue.geocode);
      }}
      filterOptions={(options, params) => {
        return filter(options, params);
      }}
      options={clubs}
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        if (option && option.nome) return option.nome;
        return "";
      }}
      renderOption={(props, option) => {
        return <li {...props}>{option.nome}</li>;
      }}
      freeSolo
      renderInput={(params) => <CustomInputComponent params={params} />}
    />
  );
}
