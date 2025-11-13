import express from "express";
import {
  createOrUpdateTank,
  updateTankDataById,
  getUserTanks,
} from "../controllers/tankController.js";

const tankRoute = express.Router();

tankRoute.post("/create", createOrUpdateTank);
tankRoute.post("/update", updateTankDataById);
tankRoute.get("/getTanks", getUserTanks);

export default tankRoute;
