import express from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Try again after 15 minutes.",
  },
});

const isLocalRequest = (req) =>
  req.hostname === "localhost" || req.hostname === "127.0.0.1";

const isValidAdminPassword = async (password) => {
  if (process.env.ADMIN_PASS_HASH) {
    return bcrypt.compare(password, process.env.ADMIN_PASS_HASH);
  }

  return password === process.env.ADMIN_PASS;
};

router.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body || {};

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.length > 128 ||
    password.length > 256
  ) {
    return res.status(400).json({ success: false, message: "Invalid login payload" });
  }

  if (username === process.env.ADMIN_USER && await isValidAdminPassword(password)) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    const isLocal = isLocalRequest(req);

    res.cookie("itpark_admin", token, {
      httpOnly: true,
      secure: !isLocal,
      sameSite: isLocal ? "lax" : "none",
      maxAge: 2 * 60 * 60 * 1000,
      path: "/",
    });

    return res.json({ success: true });
  }

  return res.status(401).json({ success: false, message: "Invalid username or password" });
});

router.get("/check", (req, res) => {
  const token = req.cookies?.itpark_admin;

  if (!token) {
    return res.json({ valid: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ valid: true });
  } catch {
    return res.json({ valid: false });
  }
});

router.post("/logout", (req, res) => {
  const isLocal = isLocalRequest(req);

  res.clearCookie("itpark_admin", {
    httpOnly: true,
    secure: !isLocal,
    sameSite: isLocal ? "lax" : "none",
    path: "/",
  });

  return res.json({ success: true });
});

export default router;
