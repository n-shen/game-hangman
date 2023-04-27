import express from "express";
import {
  getCtm,
  postCtm,
  updateCtm,
  destroyCtm,
} from "../controllers/customize.controller.js";

const ctmRouter = express.Router();

ctmRouter.post("/get", getCtm);
ctmRouter.post("/post", postCtm);
ctmRouter.post("/update", updateCtm);
ctmRouter.post("/destroy", destroyCtm);

export default ctmRouter;
