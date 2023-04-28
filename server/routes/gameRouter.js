import express from "express";
import {
  getDictionary,
  getSharingDictionary,
  getRank,
} from "../controllers/game.controller.js";

const gameRouter = express.Router();

gameRouter.post("/dictionary", getDictionary);
gameRouter.post("/sharingdictionary", getSharingDictionary);
gameRouter.get("/rank", getRank);

export default gameRouter;
