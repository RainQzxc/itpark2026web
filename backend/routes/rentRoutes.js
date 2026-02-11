import express from "express";
import { getRooms, toggleRentStatus, addRoom } from "../controllers/rentController.js";
import adminProtect from "../middleware/adminProtect.js"; // Чиний бичсэн middleware

const router = express.Router();

// Public: Хэн ч харж болно
router.get("/", getRooms);

// Protected: Зөвхөн нэвтэрсэн админ
router.put("/:id/toggle", adminProtect, toggleRentStatus);
router.post("/", adminProtect, addRoom);

export default router;