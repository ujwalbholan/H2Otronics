import fs from "fs";
import path from "path";

const commandsFile = path.join(process.cwd(), "src", "data", "commands.json");

const readCommands = () => {
  if (!fs.existsSync(commandsFile)) {
    fs.writeFileSync(commandsFile, "[]");
  }
  return JSON.parse(fs.readFileSync(commandsFile));
};

const writeCommands = (arr) => {
  fs.writeFileSync(commandsFile, JSON.stringify(arr, null, 2));
};

export const queueCommand = (tankId, command) => {
  const commands = readCommands();
  const newCmd = {
    id: Date.now().toString(),
    tankId,
    command,
    createdAt: new Date().toISOString()
  };
  commands.push(newCmd);
  writeCommands(commands);
  console.log(` Auto-command queued: ${tankId} → ${command}`);
};

export const addCommand = (req, res) => {
  const { tankId, command } = req.body;
  if (!tankId || !command) {
    return res.status(400).json({ success: false, error: "tankId and command required" });
  }

  const commands = readCommands();
  const newCmd = {
    id: Date.now().toString(),
    tankId,
    command,       
    createdAt: new Date().toISOString()
  };
  commands.push(newCmd);
  writeCommands(commands);

  res.json({ success: true, queued: newCmd });
};

export const getCommandsForTank = (req, res) => {
  const tankId = req.query.tankId;

  console.log(tankId);

  if (!tankId) {
    return res.status(400).json({ success: false, error: "tankId query required" });
  }

  const commands = readCommands();
  const forThisTank = commands.filter(c => c.tankId === tankId);

  const remaining = commands.filter(c => c.tankId !== tankId);
  writeCommands(remaining);

  res.json({ success: true, commands: forThisTank });
};

export const ackCommand = (req, res) => {
  const { id, tankId, status } = req.body;
  console.log(`ACK from ${tankId} for command ${id}: ${status}`);
  res.json({ success: true });
};
