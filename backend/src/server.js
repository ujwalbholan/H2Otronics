import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tankRoutes from "./routes/tankRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import controlRoutes from "./routes/controlRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", tankRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api", controlRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend server is running!" });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/h2otronics", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
