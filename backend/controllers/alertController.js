// controllers/alertController.js
import Alert from "../models/Alert.js";

// =============================
// GET ALL ALERTS
// =============================
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to load alerts" });
  }
};

// =============================
// ADD NEW ALERT
// =============================
export const addAlert = async (req, res) => {
  try {
    const newAlert = new Alert(req.body);
    await newAlert.save();
    res.json({ success: true, alert: newAlert });
  } catch (err) {
    res.status(500).json({ error: "Failed to save alert" });
  }
};

// =============================
// MARK AS READ
// =============================
export const markRead = async (req, res) => {
  try {
    await Alert.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update" });
  }
};
