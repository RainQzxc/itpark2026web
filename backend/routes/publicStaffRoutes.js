import express from "express";
import Staff from "../models/Staff.js";

const router = express.Router();

// Нийтэд нээлттэй: Ажилчдын мэдээллийг зөвхөн унших
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: "Мэдээлэл авахад алдаа гарлаа" });
  }
});

export default router;