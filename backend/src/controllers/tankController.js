import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { checkForAlerts } from "./alertController.js";
import { queueCommand } from "./controlController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, "../data/tanks.json");
const settingsFile = path.join(process.cwd(), "src", "data", "settings.json");

export const updateTankData = (req, res) => {
  const { tankId, level, pumpStatus } = req.body;

  console.log("📩 Incoming Tank Update:", tankId, level, pumpStatus);

  let tanks = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  tanks[tankId] = { level, pumpStatus, updated: new Date().toLocaleTimeString() };

  fs.writeFileSync(dataFile, JSON.stringify(tanks, null, 2));

  checkForAlerts(tankId, level);

  const settings = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
  console.log("⚙️ AutoPump Mode:", settings.autoPump, "| Low:", settings.lowThreshold, "| High:", settings.highThreshold);

  if (settings.autoPump === true) {
    if (level < settings.lowThreshold) {
      console.log(`🔽 Level ${level}% < ${settings.lowThreshold} → Queuing command ON`);
      queueCommand(tankId, "ON");
    } else if (level > settings.highThreshold) {
      console.log(`🔼 Level ${level}% > ${settings.highThreshold} → Queuing command OFF`);
      queueCommand(tankId, "OFF");
    } else {
      console.log("✅ Level Normal Range | No Auto Command");
    }
  }

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