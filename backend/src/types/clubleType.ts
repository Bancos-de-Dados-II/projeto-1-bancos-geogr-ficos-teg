import { z } from "zod";
import {
  ClubeSchema,
  GeocodeSchema,
  TituloSchema,
} from "../schemas/clubSchema";

export type Geocode = z.infer<typeof GeocodeSchema>;
export type Titulo = z.infer<typeof TituloSchema>;
export type Clube = z.infer<typeof ClubeSchema>;
export type ClubeInput = Omit<Clube, "id">;
