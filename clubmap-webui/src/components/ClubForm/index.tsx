import { TextField, IconButton } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "./styles.css";
import { AddCircle, Delete, CheckCircle, Clear } from "@mui/icons-material";
import UploadBtn from "./UploadBtn";
import { ClubUpdateOrCreate } from "../../types";
import { clubSchema } from "../../schemas";
import { clubStateStore } from "../../store/clubOperationStore";
import { useClubStore } from "../../store/clubStore";
import DeleteIcon from "@mui/icons-material/Delete";

interface ClubFormProps {
  club?: ClubUpdateOrCreate;
  onCancel: () => void;
}

export default function ClubForm({ onCancel, club }: ClubFormProps) {
  const {
    currentOperation,
    currentOperationLocation,
    setCurrentOperation,
    resetState,
  } = clubStateStore();
  const { loading, addClub, updateClub, removeClub } = useClubStore();
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

  const onSubmit = handleSubmit(async (data) => {
    if (!currentOperationLocation) {
      return;
    }
    const club = {
      ...data,
      geocode: currentOperationLocation,
    };
    if (currentOperation === "create") {
      await addClub(club);
    } else if (currentOperation === "edit") {
      await updateClub(club);
    }
    resetState();
  });

  async function handleDelete() {
    if (currentOperation !== "edit") return;
    await removeClub(club.id);
    resetState();
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "titulos",
  });

  return (
    <form id="club-edit-form" onSubmit={onSubmit}>
      <div id="club-edit-form-upperdiv">
        <IconButton
          color="primary"
          size="small"
          type="submit"
          disabled={loading}
        >
          <CheckCircle fontSize="large" />
        </IconButton>
        <IconButton
          color="primary"
          size="small"
          onClick={onCancel}
          disabled={loading}
        >
          <Clear fontSize="large" />
        </IconButton>
        <IconButton
          color="primary"
          size="small"
          onClick={handleDelete}
          disabled={loading}
          sx={{
            display: currentOperation === "edit" ? "flex" : "none",
          }}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <hr id="club-form-hr" />

          <div id="club-edit-form-camps">
            <TextField
              required
              error={!!errors.nome}
              label="Nome"
              variant="filled"
              size="small"
              {...register("nome")}
              helperText={errors.nome?.message}
            />

            <div id="club-edit-form-titulosdiv">
              <span>Títulos</span>
              {fields.map((field, index) => (
                <div className="club-edit-form-titulofield" key={field.id}>
                  <TextField
                    id="titulo-name"
                    error={!!errors.titulos?.[index]?.nome}
                    label="Nome"
                    variant="standard"
                    size="small"
                    {...register(`titulos.${index}.nome`)}
                    // helperText={errors.titulos?.[index]?.nome?.message}
                  />

                  <TextField
                    id="titulo-number"
                    error={!!errors.titulos?.[index]?.conquistas}
                    variant="standard"
                    size="small"
                    type="number"
                    placeholder="1"
                    {...register(`titulos.${index}.conquistas`)}
                    // helperText={errors.titulos?.[index]?.conquistas?.message}
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
                  append({ nome: "", conquistas: 1 });
                }}
              >
                <AddCircle color="primary" />
              </IconButton>
            </div>

            <TextField
              required
              error={!!errors.estadio}
              label="Estádio"
              variant="filled"
              {...register("estadio")}
              helperText={errors.estadio?.message}
            />

            <TextField
              required
              error={!!errors.anoFundacao}
              label="Ano de Fundação"
              variant="filled"
              type="number"
              {...register("anoFundacao")}
              helperText={errors.anoFundacao?.message}
            />

            <TextField
              required
              error={!!errors.presidente}
              label="Presidente"
              variant="filled"
              {...register("presidente")}
              helperText={errors.presidente?.message}
            />

            <TextField
              required
              error={!!errors.tecnico}
              label="Técnico"
              variant="filled"
              {...register("tecnico")}
              helperText={errors.tecnico?.message}
            />

            <TextField
              label="Principal Rival"
              variant="filled"
              {...register("principalRival")}
              helperText={errors.principalRival?.message}
            />

            <UploadBtn onFileSelect={(file) => setValue("escudo", file)} />
          </div>
        </>
      )}
    </form>
  );
}
