import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import adminProtect from "../middleware/adminProtect.js"; // Хамгаалагч нэмэв
import {
  getAllNews,
  getSingleNews,
  addNews,
  deleteNews
} from "../controllers/newsController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* GET (Public) */
router.get("/", getAllNews);
router.get("/:id", getSingleNews);

/* IMAGE UPLOAD (Protected) */
router.post("/upload", adminProtect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.json({ success: false, error: "Зураг байхгүй байна" });

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "itpark/news",
      public_id: "news_" + Date.now()
    });

    res.json({ success: true, image: result.secure_url });
  } catch (err) {
    res.status(500).json({ success: false, error: "Зураг хадгалахад алдаа гарлаа" });
  }
});

/* CREATE (Protected) */
router.post("/", adminProtect, addNews);

/* DELETE (Protected) */
router.delete("/:id", adminProtect, deleteNews);

export default router;