import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

import "./styles.css";

interface UploadBtnProps {
  onFileSelect: (file: File | null | undefined) => void;
}

export default function UploadBtn({ onFileSelect }: UploadBtnProps) {
  const [file, setFile] = useState<File | null | undefined>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.item(0);
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  return (
    <Button
      size="small"
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUpload />}
      sx={{ width: 100 }}
    >
      {file?.name || "Escudo"}
      <input
        id="club-file-input"
        accept="image/png"
        type="file"
        onChange={handleFileChange}
      />
    </Button>
  );
}
