import express from "express";
import validAuth from "../middleware/validAuth.js";
import {
  getCtm,
  postCtm,
  updateCtm,
  destroyCtm,
} from "../controllers/customize.controller.js";

const ctmRouter = express.Router();

ctmRouter.use(validAuth);
ctmRouter.post("/get", getCtm);
ctmRouter.post("/post", postCtm);
ctmRouter.post("/update", updateCtm);
ctmRouter.post("/destroy", destroyCtm);

export default ctmRouter;
