import { z } from "zod";

export const GeocodeSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
});

export const TituloSchema = z.object({
  nome: z.string(),
  conquistas: z.number().min(1, "Conquistas devem ser ao menos 1"),
});

const BaseClubeSchema = z.object({
  nome: z.string(),
  tecnico: z.string(),
  presidente: z.string(),
  anoFundacao: z
    .number()
    .min(1900, "Ano de fundação deve ser maior ou igual a 1900")
    .max(2025, "Ano de fundação deve ser menor ou igual a 2025"),
  estadio: z.string(),
  principalRival: z.string().optional(),
  escudo_url: z.string().optional(),
  geocode: GeocodeSchema,
  titulos: z.array(TituloSchema),
});

export const ClubeSchema = BaseClubeSchema.extend({
  id: z.string(),
});

export const ClubeInputSchema = BaseClubeSchema.extend({
  titulos: z.array(TituloSchema),
});

export const RawClubeInputSchema = BaseClubeSchema.extend({
  escudo_file: z.any(),
});
