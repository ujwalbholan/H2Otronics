// src/controllers/tankController.js
import { db } from "../firebase/firebaseConfig.js";
import { v4 as uuidv4 } from "uuid";
import { handleControllerError } from "../utils/errorUtils.js";

// Create a tank (metadata only – telemetry is handled separately)
export const createTank = async (req, res) => {
  try {

    const userId = req.user.uid;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      tankName,
      tankType,
      capacity,
      level = 0,
      pumpStatus,
      temperature = 0,
    } = req.body;


    if (!tankName || !tankType || !capacity) {
      return res
        .status(400)
        .json({ message: "tankName, tankType and capacity are required" });
    }

    const normalizedName = tankName.trim();
    const normalizedType = tankType.trim();
    const normalizedCapacity = capacity.toString().trim();
    const normalizedPumpStatus = pumpStatus === "ON" ? "ON" : "OFF";
    const numericLevel = Number(level) || 0;
    const numericTemp = Number(temperature) || 0;

    const userRef = db.collection("users").doc(userId);
    const tanksRef = userRef.collection("tanks");


    // Optional: enforce unique tank names (case insensitive) per user
    const duplicate = await tanksRef
      .where("tankNameLower", "==", normalizedName.toLowerCase())
      .limit(1)
      .get();

    if (!duplicate.empty) {
      return res.status(409).json({
        message: "Tank with this name already exists",
      });
    }
    const tankId = uuidv4();
    const now = new Date().toISOString();

    const tankPayload = {
      tankId,
      tankName: normalizedName,
      tankNameLower: normalizedName.toLowerCase(),
      tankType: normalizedType,
      capacity: normalizedCapacity,
      level: numericLevel,
      pumpStatus: normalizedPumpStatus,
      temperature: numericTemp,
      created: now,
      updated: now,
    };

    await tanksRef.doc(tankId).set(tankPayload);

    return res.status(201).json({ success: true, data: tankPayload });
  } catch (err) {
    return handleControllerError(res, err, "Failed to create tank");
  }
};

// Update tank data (from IoT device)
export const updateTankDataById = async (req, res) => {
  try {
    const userId = req.user.uid;
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
    handleControllerError(res, err, "Failed to update tank data");
  }
};

// Get all tanks for a user
export const getUserTanks = async (req, res) => {
  try {
    const userId = req.user?.uid;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("tanks")
      .get();

    const tanks = {};

    snapshot.forEach((doc) => (tanks[doc.id] = doc.data()));

    res.json({ success: true, tanks });
  } catch (err) {
    handleControllerError(res, err, "Failed to fetch tanks");
  }
};

// Delete a tank
export const deleteTank = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { tankId } = req.body;

    if (!tankId) return res.status(400).json({ message: "tankId required" });

    const tankRef = db
      .collection("users")
      .doc(userId)
      .collection("tanks")
      .doc(tankId);

    await tankRef.delete();

    res.json({ success: true, message: "Tank deleted successfully" });
  } catch (err) {
    handleControllerError(res, err, "Failed to delete tank");
  }
};
