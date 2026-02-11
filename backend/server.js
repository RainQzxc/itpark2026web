// ===============================
// LOAD ENV VARIABLES FIRST
// ===============================
import dotenv from "dotenv";
dotenv.config();

// ===============================
// IMPORTS
// ===============================
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // ШИНЭ: Security headers
import rateLimit from "express-rate-limit"; // ШИНЭ: DDoS болон Brute-force хамгаалалт

// ROUTES
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import directorRoutes from "./routes/directorRoutes.js";
import contactRoutes from "./routes/contact.js";
import newsRoutes from "./routes/newsRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import publicStaffRoutes from "./routes/publicStaffRoutes.js";
import statsRoutes from "./routes/stats.route.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import rentRoutes from "./routes/rentRoutes.js";

// ===============================
// ES MODULE FIX
// ===============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================
// APP + PORT
// ===============================
const app = express();
const PORT = process.env.PORT || 5050;

// ===============================
// SECURITY MIDDLEWARE (ZERO ACCESS STRATEGY)
// ===============================
// 1. Helmet: HTTP толгой мэдээллийг нууцалж, зарим төрлийн вэб халдлагаас сэргийлнэ
app.use(helmet());

// 2. Rate Limiting: Нэг IP-аас ирэх хүсэлтийг хязгаарлах (15 минутад хамгийн ихдээ 100 хүсэлт)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // IP бүрт 100 хүсэлтийн хязгаар
  message: "Too many requests from this IP, please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});
// Зөвхөн API замууддаа хязгаар тогтооно

// ===============================
// MONGODB CONNECT
// ===============================
mongoose
  .connect(process.env.MONGO_URI, { dbName: "itpark" })
  .then(() => console.log("✔ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ===============================
// CORS CONFIG (STRICT POLICY)
// ===============================
const allowedOrigins = [
  "https://itpark.mn",
  "https://www.itpark.mn",
  "https://itpark2025.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow no-origin requests (development)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      console.error("❌ BLOCKED BY CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ===============================
// MIDDLEWARES
// ===============================
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Debug Logger
app.use((req, res, next) => {
  console.log(`➡ ${req.method} ${req.url}`);
  next();
});

// ===============================
// ROUTES (PROTECTION APPLIED VIA MIDDLEWARE LATER)
// ===============================
app.use("/api/news", newsRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/director", directorRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/public/staff", publicStaffRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/rent", rentRoutes);

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Backend locked & running → http://127.0.0.1:${PORT}`);
});