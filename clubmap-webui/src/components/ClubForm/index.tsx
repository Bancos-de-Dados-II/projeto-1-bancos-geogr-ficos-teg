import { TextField, IconButton } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "./styles.css";
import { AddCircle, Delete, CheckCircle, Clear } from "@mui/icons-material";
import UploadBtn from "./UploadBtn";
import { ClubUpdateOrCreate } from "../../types";
import { clubSchema } from "../../schemas";

interface ClubFormProps {
  club?: ClubUpdateOrCreate;
  onCancel: () => void;
}

export default function ClubForm({ onCancel, club }: ClubFormProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClubUpdateOrCreate>({
    resolver: zodResolver(clubSchema),
    defaultValues: club || {},
  });

  const onSubmit = handleSubmit(
    (data) => {
      // use the currentOperationLocation here
      console.log("Form Data:", data);
    },
    (errors) => {
      console.error("Form Errors:", errors);
    },
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "titulos",
  });

  return (
    <form id="club-edit-form" onSubmit={onSubmit}>
      <div id="club-edit-form-upperdiv">
        <IconButton color="primary" size="small" type="submit">
          <CheckCircle fontSize="large" />
        </IconButton>
        <IconButton color="primary" size="small" onClick={onCancel}>
          <Clear fontSize="large" />
        </IconButton>
      </div>

      <hr id="club-form-hr" />

      <div id="club-edit-form-camps">
        <TextField
          required
          error={!!errors.nome}
          label="Nome"
          variant="filled"
          size="small"
          {...register("nome")}
          slotProps={{
            inputLabel: { sx: { paddingLeft: 1 } },
            input: { sx: { paddingLeft: 1 } },
          }}
        />

        <div id="club-edit-form-titulosdiv">
          <span>Títulos</span>
          {fields.map((field, index) => (
            <div className="club-edit-form-titulofield" key={field.id}>
              <TextField
                error={!!errors.titulos?.[index]?.nome}
                label="Nome"
                variant="standard"
                {...register(`titulos.${index}.nome`)}
                size="small"
                slotProps={{
                  inputLabel: { sx: { paddingLeft: 1 } },
                  input: {
                    sx: {
                      paddingLeft: 1,
                      display: "inline-block",
                      marginRight: "1rem",
                    },
                  },
                }}
              />

              <TextField
                error={!!errors.titulos?.[index]?.conquistas}
                variant="standard"
                size="small"
                type="number"
                placeholder="1"
                {...register(`titulos.${index}.conquistas`)}
                slotProps={{
                  input: {
                    sx: {
                      width: 35,
                      textAlign: "center",
                      alignSelf: "flex-end",
                      textAlignLast: "center",
                      fontSize: "1rem",
                    },
                  },
                }}
              />

              <IconButton
                aria-label="delete"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(index);
                }}
              >
                <Delete color="primary" />
              </IconButton>
            </div>
          ))}

          <IconButton
            aria-label="add"
            onClick={(e) => {
              e.stopPropagation();
              append({
                nome: "",
                conquistas: 1,
              });
            }}
          >
            <AddCircle color="primary" />
          </IconButton>
        </div>

        <TextField
          required
          error={!!errors.estadio}
          label="Estadio"
          variant="filled"
          {...register("estadio")}
          slotProps={{
            inputLabel: { sx: { paddingLeft: 1 } },
            input: { sx: { paddingLeft: 1 } },
          }}
        />

        <TextField
          required
          error={!!errors.anoFundacao}
          helperText={errors.anoFundacao?.message}
          label="Ano de Fundação"
          placeholder="1900"
          variant="filled"
          type="number"
          {...register("anoFundacao")}
          slotProps={{
            inputLabel: { sx: { paddingLeft: 1 } },
            input: { sx: { paddingLeft: 1 } },
          }}
        />

        <TextField
          required
          error={!!errors.presidente}
          label="Presidente"
          variant="filled"
          {...register("presidente")}
          slotProps={{
            inputLabel: { sx: { paddingLeft: 1 } },
            input: { sx: { paddingLeft: 1 } },
          }}
        />

        <TextField
          required
          error={!!errors.tecnico}
          label="Tecnico"
          variant="filled"
          {...register("tecnico")}
          slotProps={{
            inputLabel: { sx: { paddingLeft: 1 } },
            input: { sx: { paddingLeft: 1 } },
          }}
        />

        <TextField
          label="Principal Rival"
          variant="filled"
          {...register("principalRival")}
          slotProps={{
            inputLabel: { sx: { paddingLeft: 1 } },
            input: { sx: { paddingLeft: 1 } },
          }}
        />

        <UploadBtn
          onFileSelect={(file) => {
            setValue("escudo", file);
          }}
        />
      </div>
    </form>
  );
}
