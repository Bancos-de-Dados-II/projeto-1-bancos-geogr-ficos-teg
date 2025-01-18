import { LatLng } from "leaflet";
import { z } from "zod";

export const clubSchema = z.object({
  nome: z.string().trim().nonempty({ message: "Não pode ser vazio!" }),
  tecnico: z.string().trim().nonempty({ message: "Não pode ser vazio!" }),
  presidente: z.string().trim().nonempty({ message: "Não pode ser vazio!" }),
  principalRival: z.string().optional(),
  anoFundacao: z.coerce
    .number()
    .min(1800, { message: "Deve ser no mínimo 1800." })
    .max(2022, { message: "Deve ser no máximo 2022." }),
  escudo: z.custom<File>((v) => v instanceof File).optional(),
  estadio: z.string().trim().nonempty({ message: "Não pode ser vazio!" }),
  geocode: z.custom<LatLng>((v: unknown) => v instanceof LatLng),
  titulos: z.array(
    z
      .object({
        nome: z.string().trim().nonempty({ message: "Não pode ser vazio!" }),
        conquistas: z.coerce
          .number()
          .min(1, { message: "Deve ser no mínimo 1." }),
      })
      .optional(),
  ),
});
