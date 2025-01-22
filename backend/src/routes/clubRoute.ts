import { Router } from "express";
import * as clubeController from "../controllers/clubeController";
import { processRawClubeInput } from "../middlewares/clubeMiddleware";
import { fileMiddleware } from "../services/multerService";

const clubRouter = Router();

clubRouter.get("/", clubeController.getAll);
clubRouter.get("/:id", clubeController.getById);
clubRouter.post("/", processRawClubeInput, clubeController.createClube);
clubRouter.post("/icon/:id", fileMiddleware, clubeController.insertIcon);
clubRouter.put("/:id", processRawClubeInput, clubeController.updateClube);
clubRouter.delete("/:id", clubeController.deleteClube);

export default clubRouter;
