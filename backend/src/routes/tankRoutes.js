import express from "express";
import { updateTankData, getTankData, controlPump } from "../controllers/tankController.js";

const tankRouter = express.Router();

tankRouter.post("/update", updateTankData);     
tankRouter.get("/tank-data", getTankData);      
tankRouter.post("/control", controlPump);       

export default rtankRouter;