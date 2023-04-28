import express from "express";
import validAuth from "../middleware/validAuth.js";

import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const profileRouter = express.Router();

profileRouter.use(validAuth);
profileRouter.post("/get", getProfile);
profileRouter.post("/update", updateProfile);

export default profileRouter;
