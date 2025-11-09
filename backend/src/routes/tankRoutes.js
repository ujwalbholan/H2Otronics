import express from "express";
import { updateTankData, getTankData, controlPump } from "../controllers/tankController.js";

const router = express.Router();

router.post("/update", updateTankData);     
router.get("/tank-data", getTankData);      
router.post("/control", controlPump);       

export default router;