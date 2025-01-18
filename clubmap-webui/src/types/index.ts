import { z } from "zod";
import { clubSchema } from "../schemas";
import { Icon } from "leaflet";

export type UpdatedClub = z.infer<typeof clubSchema> & {
  id: string;
};

export type NewClub = z.infer<typeof clubSchema>;

export type Club = Omit<UpdatedClub, "escudo"> & {
  escudo: Icon;
};
