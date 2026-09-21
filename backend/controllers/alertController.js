// controllers/alertController.js
import Alert from "../models/Alert.js";
import { cleanText, pickFields } from "../utils/contentSecurity.js";

const cleanAlertPayload = (body = {}) => {
  const picked = pickFields(body, [
    "trainingId",
    "lastname",
    "name",
    "register",
    "email",
    "phone1",
    "phone2",
    "company",
    "position",
  ]);

  return {
    trainingId: cleanText(picked.trainingId, 80),
    lastname: cleanText(picked.lastname, 120),
    name: cleanText(picked.name, 120),
    register: cleanText(picked.register, 80),
    email: cleanText(picked.email, 160),
    phone1: cleanText(picked.phone1, 80),
    phone2: cleanText(picked.phone2, 80),
    company: cleanText(picked.company, 160),
    position: cleanText(picked.position, 160),
  };
};

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
    const payload = cleanAlertPayload(req.body);
    if (!payload.trainingId) {
      return res.status(400).json({ success: false, error: "Training id is required" });
    }

    const newAlert = new Alert(payload);
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
