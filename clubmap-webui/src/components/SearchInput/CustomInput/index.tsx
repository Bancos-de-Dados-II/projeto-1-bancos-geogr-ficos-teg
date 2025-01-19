import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface InputComponentProps {
  params: AutocompleteRenderInputParams;
}

export function CustomInputComponent({ params }: InputComponentProps) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        {...params.InputProps}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Club"
        inputProps={{
          ...params.inputProps,
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} disabled>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
