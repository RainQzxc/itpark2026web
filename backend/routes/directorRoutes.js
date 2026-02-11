import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import adminProtect from "../middleware/adminProtect.js"; // Хамгаалагч нэмэв
import { getDirector, saveDirector } from "../controllers/directorController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* ===============================
   GET — MongoDB Director info (Public)
================================= */
router.get("/", getDirector);

/* ===============================
   POST — Upload image to Cloudinary (Protected)
================================= */
router.post("/upload", adminProtect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, error: "Зураг сонгогдоогүй байна" });

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const filename = "director_" + Date.now();

    const result = await cloudinary.uploader.upload(base64, {
      folder: "itpark/director",
      public_id: filename,
      overwrite: true
    });

    res.json({ success: true, image: result.secure_url });
  } catch (err) {
    console.error("❌ Cloudinary Upload Error:", err);
    res.status(500).json({ success: false, error: "Зураг хуулахад алдаа гарлаа" });
  }
});

/* ===============================
   POST — Save / Update Director (Protected)
================================= */
router.post("/save", adminProtect, saveDirector);

export default router;