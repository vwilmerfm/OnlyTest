import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt.js"
const router = Router();

import * as interactionCtrl from "../controllers/interactionController.js";

router.post("/interaction", verifyToken, interactionCtrl.createInteraction);

export default router;
