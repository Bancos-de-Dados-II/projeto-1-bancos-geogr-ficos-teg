import { Router } from "express";
import clubRouter from "./clubRoute";

const router = Router();

router.use("/clube", clubRouter);

export default router;
