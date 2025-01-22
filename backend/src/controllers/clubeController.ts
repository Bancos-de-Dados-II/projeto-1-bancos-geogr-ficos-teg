import { Request, Response } from "express";
import { Clube, Titulo } from "../models";
import ClubeService from "../services/clubeService";

const clubeService = new ClubeService(Clube, Titulo);

export async function getAll(_: Request, res: Response) {
  try {
    const clubes = await clubeService.get();
    res.status(200).send(clubes);
  } catch (error) {
    console.error("Error fetching clubes: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const clube = await clubeService.getById(id);
    res.status(200).send(clube);
  } catch (error) {
    console.error("Error fetching clube: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createClube(req: Request, res: Response) {
  try {
    const clube = await clubeService.create(req.body.clube);
    res.status(200).send(clube);
  } catch (error) {
    console.log("Error ao tentar criar clube: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function insertIcon(req: Request, res: Response) {
  const { id } = req.params;
  const { imageurl } = req.body;
  const clube = await clubeService.updateIcon(id, imageurl);
  console.log(clube);
  res.status(200).json(clube);
}

export async function updateClube(req: Request, res: Response) {
  const id = req.params.id;
  const updatedData = req.body.clube;

  try {
    const clube = await clubeService.update(id, updatedData);
    res.status(200).json(clube);
  } catch (error) {
    console.error("Error updating clube: ", error);
    res.status(500).json({ message: "Error updating clube" });
  }
}

export async function deleteClube(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await clubeService.delete(id);
    res.status(200).json({ message: "Clube deleted successfully" });
  } catch (error) {
    console.log("Erro ao excluir um clube:", error);
  }
}
