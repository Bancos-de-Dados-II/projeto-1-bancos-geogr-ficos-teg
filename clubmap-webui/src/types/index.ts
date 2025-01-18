import { z } from "zod";
import { clubSchema } from "../schemas";
import { Icon } from "leaflet";

export type ClubUpdateOrCreate = z.infer<typeof clubSchema> & {
  id?: string;
};

export type ClubWithIcon = Omit<ClubUpdateOrCreate, "escudo"> & {
  id: string;
  escudo: Icon;
};
