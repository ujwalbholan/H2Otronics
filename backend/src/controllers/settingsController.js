import fs from "fs";
import path from "path";

const settingsFile = path.join(process.cwd(), "src", "data", "settings.json");

// GET /api/settings
export const getSettings = (req, res) => {
  const settings = JSON.parse(fs.readFileSync(settingsFile));
  res.json(settings);
};

// POST /api/settings
export const updateSettings = (req, res) => {
  const settings = req.body;
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
  res.json({ success: true, updated: settings });
};