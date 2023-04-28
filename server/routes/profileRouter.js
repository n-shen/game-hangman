import express from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const profileRouter = express.Router();

profileRouter.post("/get", getProfile);
profileRouter.post("/update", updateProfile);

export default profileRouter;
