import express from "express";
import Stats from "../models/stats.model.js";
import adminProtect from "../middleware/adminProtect.js"; // Хамгаалагч нэмэв

const router = express.Router();

// GET stats (Public)
router.get("/", async (req, res) => {
  try {
    const stats = await Stats.findOne();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Статистик авахад алдаа гарлаа" });
  }
});

// UPDATE stats (Protected - Зөвхөн Админ)
router.put("/", adminProtect, async (req, res) => {
  try {
    const updated = await Stats.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: "Засварлахад алдаа гарлаа" });
  }
});

export default router;