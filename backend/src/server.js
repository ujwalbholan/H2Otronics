import express from "express";
import cors from "cors";
import tankRoutes from "./routes/tankRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow cross-origin requests if frontend is separate
app.use(express.json()); // Parse JSON bodies


app.use("/api", tankRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend server is running!" });
});

// Example API route
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Ujwal Bholan" },
    { id: 2, name: "John Doe" }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
