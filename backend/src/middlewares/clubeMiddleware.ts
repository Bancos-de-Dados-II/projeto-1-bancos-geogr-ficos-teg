import { NextFunction, Request, Response } from "express";
import { RawClubeInputSchema } from "../schemas/clubSchema";
import { ClubeInput } from "../types/clubleType";
import { z } from "zod";
import { fileMiddleware } from "../services/multerService";

export async function processRawClubeInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const club = RawClubeInputSchema.parse(req.body);

    const clubInput: ClubeInput = {
      ...club,
    };

    req.body.clube = clubInput;

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    next(error);
  }
}
