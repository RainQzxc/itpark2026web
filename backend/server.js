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
import { validateEnv } from "./config/env.js";

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
import { rejectUnsafeBody } from "./utils/contentSecurity.js";

validateEnv();

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
app.set("trust proxy", 1);

// ===============================
// SECURITY MIDDLEWARE (ZERO ACCESS STRATEGY)
// ===============================
// 1. Helmet: HTTP толгой мэдээллийг нууцалж, зарим төрлийн вэб халдлагаас сэргийлнэ
app.use(helmet());

// 2. Rate Limiting: Нэг IP-аас ирэх хүсэлтийг хязгаарлах (15 минутад хамгийн ихдээ 100 хүсэлт)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // IP бүрт 100 хүсэлтийн хязгаар
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
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
  "https://frontend-rainqzxcs-projects.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const vercelPreviewOriginPattern = /^https:\/\/frontend-[a-z0-9-]+\.vercel\.app$/;

const isAllowedOrigin = (origin) =>
  allowedOrigins.includes(origin) || vercelPreviewOriginPattern.test(origin);

const requireTrustedOrigin = (req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();

  const origin = req.get("origin");
  if (!origin || isAllowedOrigin(origin)) return next();

  return res.status(403).json({ success: false, message: "Untrusted request origin" });
};

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow no-origin requests (development)
      if (!origin) return callback(null, true);

      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      
      console.error("❌ BLOCKED BY CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use("/api", limiter);
app.use("/api", requireTrustedOrigin);

// ===============================
// MIDDLEWARES
// ===============================
app.use(cookieParser());
app.use(express.json({ limit: "1mb", strict: true }));
app.use("/api", rejectUnsafeBody);
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

app.use((err, req, res, next) => {
  if (!err) return next();

  if (err.type === "entity.too.large") {
    return res.status(413).json({ success: false, message: "Request body is too large" });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ success: false, message: "Uploaded file is too large" });
  }

  if (err.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({ success: false, message: "Only one file is allowed" });
  }

  if (err.message === "Unsupported file type") {
    return res.status(400).json({ success: false, message: "Unsupported file type" });
  }

  console.error("Unhandled API error:", err);
  return res.status(500).json({ success: false, message: "Internal server error" });
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Backend locked & running → http://127.0.0.1:${PORT}`);
});
