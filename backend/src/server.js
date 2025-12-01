import express from "express";
import cors from "cors";
import tankRoute from "./routes/tankRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import controlRoutes from "./routes/controlRoutes.js";
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
import { authenticate } from "./middleware/authenticate.js";
import paymentRoute from "./routes/paymentRouts.js";


const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors({ origin: true }));
app.use(express.json());

// app.use("/api/alerts", alertRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api", controlRoutes);

//tank api
app.use("/api/tanks", authenticate, tankRoute);
//auth api
app.use("/api/auth", authRoute);
//payment api
app.use("/api/payment", authenticate, paymentRoute);

app.get("/", (req, res) => {
  res.json({ message: "Backend server is running!" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
