import express from "express";
import { getDictionary } from "../controllers/game.controller.js";

const gameRouter = express.Router();

gameRouter.post("/dictionary", getDictionary);

// gameRouter.post("/signup", signup);

export default gameRouter;
