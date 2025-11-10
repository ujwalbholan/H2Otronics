import fs from "fs";
import path from "path";

const alertFile = path.join(process.cwd(), "src", "data", "alerts.json");
const tankFile = path.join(process.cwd(), "src", "data", "tanks.json");

// Auto-create if not exists
if (!fs.existsSync(alertFile)) fs.writeFileSync(alertFile, "[]");

export const getAlerts = (req, res) => {
  const alerts = JSON.parse(fs.readFileSync(alertFile));
  res.json(alerts);
};

export const checkForAlerts = (tankId, level) => {
  let alerts = JSON.parse(fs.readFileSync(alertFile));
  const timestamp = new Date().toLocaleTimeString();

  if (level < 30) {
    alerts.push({ tankId, type: "LOW", level, time: timestamp });
  } else if (level > 95) {
    alerts.push({ tankId, type: "OVERFLOW", level, time: timestamp });
  }

  if (alerts.length > 20) alerts = alerts.slice(-20);

  fs.writeFileSync(alertFile, JSON.stringify(alerts, null, 2));
};
