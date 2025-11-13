// src/controllers/tankController.js
import { db } from "../firebase/firebaseConfig.js";
import { v4 as uuidv4 } from "uuid";

// Create or update a tank
export const createOrUpdateTank = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { tankName, tankType, capacity } = req.body;

    const tankId = uuidv4();

    const tankRef = db
      .collection("users")
      .doc(userId)
      .collection("tanks")
      .doc(tankId);

    const tankData = {
      tankName,
      tankId,
      tankType,
      capacity,
      level: 0,
      pumpStatus: "OFF",
      temperature: 0,
      updated: new Date().toISOString(),
    };

    await tankRef.set(tankData);

    res.json({ success: true, data: tankData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update tank data (from IoT device)
export const updateTankDataById = async (req, res) => {
  try {

    const userId = req.user.user_id;
    const { tankId, level, pumpStatus, temperature } = req.body;

    if (!userId || !tankId)
      return res.status(400).json({ message: "tankId required" });

    const tankRef = db
      .collection("users")
      .doc(userId)
      .collection("tanks")
      .doc(tankId);

    const updatedTank = {
      level,
      pumpStatus,
      temperature,
      updated: new Date().toISOString(),
    };

    await tankRef.set(updatedTank, { merge: true });

    // Auto pump logic
    const tankSnap = await tankRef.get();
    const tank = tankSnap.data();
    if (tank.autoPump) {
      if (level < tank.lowThreshold) {
        console.log(`Turning pump ON for tank ${tankId}`);
      } else if (level > tank.highThreshold) {
        console.log(`🔼urning pump OFF for tank ${tankId}`);
      }
    }

    res.json({ success: true, data: updatedTank });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tanks for a user
export const getUserTanks = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("tanks")
      .get();
    const tanks = {};
    snapshot.forEach((doc) => (tanks[doc.id] = doc.data()));

    res.json({ success: true, tanks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
