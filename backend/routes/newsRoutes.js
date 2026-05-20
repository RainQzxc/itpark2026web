import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import adminProtect from "../middleware/adminProtect.js";
import {
  getAllNews,
  getSingleNews,
  addNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllNews);
router.get("/:id", getSingleNews);

router.post("/upload", adminProtect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "Image is required" });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "itpark/news",
      public_id: "news_" + Date.now(),
    });

    res.json({ success: true, image: result.secure_url });
  } catch (err) {
    console.error("Cloudinary news upload error:", err?.error?.message || err.message || err);
    res.status(500).json({
      success: false,
      error: err?.error?.message || "Image upload failed",
    });
  }
});

router.post("/", adminProtect, addNews);
router.put("/:id", adminProtect, updateNews);
router.delete("/:id", adminProtect, deleteNews);

export default router;
