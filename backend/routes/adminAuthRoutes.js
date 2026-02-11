import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

/* ==============================
       ADMIN LOGIN
============================== */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Хөгжүүлэлтийн үед утгуудыг шалгах (Туршиж дуусаад устгаж болно)
  console.log("Login attempt:", { 
    receivedUser: username, 
    receivedPass: password,
    expectedUser: process.env.ADMIN_USER 
  });

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Localhost эсэхийг илүү найдвартай шалгах
    const isLocal = 
      req.hostname === "localhost" || 
      req.hostname === "127.0.0.1";

    res.cookie("itpark_admin", token, {
      httpOnly: true,
      secure: !isLocal, // Local биш бол заавал HTTPS шаардана
      sameSite: isLocal ? "lax" : "none", // Cross-site хүсэлтэд "none" хэрэгтэй
      maxAge: 2 * 60 * 60 * 1000,
      path: "/",
    });

    console.log("✅ Login success, cookie set.");
    return res.json({ success: true });
  }

  console.log("❌ Login failed: Invalid credentials");
  res.status(401).json({ success: false, message: "Invalid username or password" });
});

/* ==============================
      TOKEN CHECK
============================== */
router.get("/check", (req, res) => {
  const token = req.cookies?.itpark_admin;

  if (!token) {
    console.log("🔍 Check: No token found");
    return res.json({ valid: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch (err) {
    console.log("🔍 Check: Token invalid or expired");
    res.json({ valid: false });
  }
});

/* ==============================
          LOGOUT
============================== */
router.post("/logout", (req, res) => {
  const isLocal = req.hostname === "localhost" || req.hostname === "127.0.0.1";

  res.clearCookie("itpark_admin", {
    httpOnly: true,
    secure: !isLocal,
    sameSite: isLocal ? "lax" : "none",
    path: "/",
  });

  res.json({ success: true });
});

export default router;