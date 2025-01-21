import {Router} from "express";
import * as clubeController from "../controllers/clubeController";

const route = Router();

route.post('/clube', clubeController.createClube);
route.put('/clube/:id', clubeController.updateClube);
route.delete('/clube/:id', clubeController.deleteClube);


export  default route