import express from "express";
import adminProtect from "../middleware/adminProtect.js";
import upload from "../middleware/multerMemory.js";
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
  uploadPartnerImage
} from "../controllers/partnerController.js";

const router = express.Router();

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
