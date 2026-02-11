import express from "express";
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getOneStaff
} from "../controllers/staffController.js";
import adminProtect from "../middleware/adminProtect.js"; 

const router = express.Router();

// Бүх үйлдлүүд ЗӨВХӨН Админд зориулагдсан
router.get("/", adminProtect, getAllStaff);
router.post("/", adminProtect, createStaff);
router.put("/:id", adminProtect, updateStaff);
router.delete("/:id", adminProtect, deleteStaff);
router.get("/:id", adminProtect, getOneStaff);

export default router;