import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, "../data/tanks.json");

export const updateTankData = (req, res) => {
  const { tankId, level, pumpStatus } = req.body;

  let tanks = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  tanks[tankId] = { level, pumpStatus, updated: new Date().toLocaleTimeString() };

  fs.writeFileSync(dataFile, JSON.stringify(tanks, null, 2));
  res.json({ success: true, updated: tanks[tankId] });
};

export const getTankData = (req, res) => {
  const tanks = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  res.json(tanks);
};

export const controlPump = (req, res) => {
  const { tankId, command } = req.body;
  console.log(`Pump Control Request → Tank: ${tankId}, Action: ${command}`);
  res.json({ success: true });
};