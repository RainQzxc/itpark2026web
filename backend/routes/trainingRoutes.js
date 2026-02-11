import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import adminProtect from "../middleware/adminProtect.js"; // Хамгаалагч нэмэв
import {
  getTraining,
  addTraining,
  updateTraining,
  deleteTraining,
  getSingleTraining
} from "../controllers/trainingController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* GET (Public) */
router.get("/", getTraining);
router.get("/:id", getSingleTraining);

/* IMAGE UPLOAD (Protected) */
router.post("/upload", adminProtect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, error: "Зураг олдсонгүй" });

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "itpark/training",
      public_id: "training_" + Date.now(),
      overwrite: true
    });

    res.json({ success: true, image: result.secure_url });
  } catch (err) {
    res.status(500).json({ success: false, error: "Зураг хадгалахад алдаа гарлаа" });
  }
});

/* CRUD (Protected) */
router.post("/", adminProtect, addTraining);
router.put("/:id", adminProtect, updateTraining);
router.delete("/:id", adminProtect, deleteTraining);

export default router;