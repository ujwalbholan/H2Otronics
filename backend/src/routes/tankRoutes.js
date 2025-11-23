import express from "express";
import {
  createTank,
  updateTankDataById,
  getUserTanks,
  deleteTank,
} from "../controllers/tankController.js";

const tankRoute = express.Router();

tankRoute.post("/create", createTank);
tankRoute.post("/update", updateTankDataById);
tankRoute.get("/getTanks", getUserTanks);
tankRoute.delete("/delete", deleteTank);

export default tankRoute;
