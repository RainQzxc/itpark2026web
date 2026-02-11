import express from "express";
import { addAlert, getAlerts, markRead } from "../controllers/alertController.js";
import adminProtect from "../middleware/adminProtect.js"; // Хамгаалагч нэмэв
import Alert from "../models/Alert.js";

const router = express.Router();

// =============================
// GET ALL ALERTS (Админ өөрөө харна)
// =============================
router.get("/", adminProtect, getAlerts);

// =============================
// GET UNREAD COUNT
// =============================
router.get("/unread/count", adminProtect, async (req, res) => {
  try {
    const count = await Alert.countDocuments({ read: false });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to load count" });
  }
});

// =============================
// ADD NEW ALERT (Зөвхөн дотоод систем эсвэл Админ нэмнэ)
// =============================
router.post("/", adminProtect, addAlert);

// =============================
// MARK AS READ (Зөвхөн Админ)
// =============================
router.put("/:id/read", adminProtect, markRead);

export default router;