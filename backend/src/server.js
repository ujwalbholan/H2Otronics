import express from "express";
import cors from "cors";
import tankRouter from "./routes/tankRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import controlRoutes from "./routes/controlRoutes.js";
import aurhRoute from "./routes/authRoute.js";
import dotenv from "dotenv";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
dotenv.config(); 

app.use("/api", tankRouter);
app.use("/api/alerts", alertRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api", controlRoutes);
//done
app.use("/api/auth", aurhRoute);


app.get("/", (req, res) => {
  res.json({ message: "Backend server is running!" });
});


app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
