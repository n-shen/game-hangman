import express from "express";
import {
  getDictionary,
  getSharingDictionary,
} from "../controllers/game.controller.js";

const gameRouter = express.Router();

gameRouter.post("/dictionary", getDictionary);
gameRouter.post("/sharingdictionary", getSharingDictionary);

// gameRouter.post("/signup", signup);

export default gameRouter;
