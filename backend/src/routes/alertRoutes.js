import express from "express";
import { getAlerts } from "../controllers/alertController.js";
import alertRoutes from "./routes/alertRoutes.js";
import { checkForAlerts } from "./alertController.js";
const router = express.Router();

app.use("/api/alerts", alertRoutes);
checkForAlerts(tankId, level);

router.get("/", getAlerts);
export default router;
