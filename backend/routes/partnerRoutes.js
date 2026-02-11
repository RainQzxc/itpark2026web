import express from "express";
import multer from "multer";
import adminProtect from "../middleware/adminProtect.js";
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
  uploadPartnerImage
} from "../controllers/partnerController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* PUBLIC */
router.get("/", getPartners);

/* IMAGE UPLOAD (Protected) */
router.post(
  "/upload",
  adminProtect,
  upload.single("image"),
  uploadPartnerImage
);

/* CRUD (Protected) */
router.post("/", adminProtect, createPartner);
router.put("/:id", adminProtect, updatePartner);
router.delete("/:id", adminProtect, deletePartner);

export default router;