import express from "express";
import { addCommand, getCommandsForTank, ackCommand } from "../controllers/controlController.js";
const router = express.Router();

router.post("/control-queue", addCommand);
router.get("/commands", getCommandsForTank);
router.post("/control-ack", ackCommand);      

export default router;
