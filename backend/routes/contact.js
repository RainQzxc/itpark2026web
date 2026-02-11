import express from "express";
import { getContact, saveContact } from "../controllers/contactController.js";
import adminProtect from "../middleware/adminProtect.js"; // Хамгаалагч нэмэв

const router = express.Router();

// Мэдээллийг хэн ч харж болно (Public)
router.get("/", getContact);

// Мэдээллийг ЗӨВХӨН Админ засна (Protected)
router.post("/save", adminProtect, saveContact);

export default router;