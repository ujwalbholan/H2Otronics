import express from "express";
import cors from "cors";
import tankRoutes from "./routes/tankRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import controlRoutes from "./routes/controlRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

app.use("/api", tankRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api", controlRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend server is running!" });
});
// app.get("/api/users", (req, res) => {
//   res.json([
//     { id: 1, name: "Ujwal Bholan" },
//     { id: 2, name: "John Doe" }
//   ]);
// });
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
