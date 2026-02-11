import jwt from "jsonwebtoken";

/**
 * Admin хамгаалалтын middleware.
 * Зөвхөн хүчинтэй 'itpark_admin' cookie-тэй бөгөөд 'admin' рольтой хэрэглэгчийг нэвтрүүлнэ.
 */
export default function adminProtect(req, res, next) {
  // 1. Cookie-гээс токен байгаа эсэхийг шалгах
  const token = req.cookies?.itpark_admin;

  if (!token) {
    // 401 Unauthorized: Токен байхгүй үед
    return res.status(401).json({ 
      success: false, 
      message: "Хандах эрхгүй байна. Нэвтрэнэ үү." 
    });
  }

  try {
    // 2. JWT Токеныг нууц түлхүүрээр баталгаажуулах
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Роль шалгах (Зөвхөн админ)
    if (decoded.role !== "admin") {
      // 403 Forbidden: Эрх хүрэхгүй үед
      return res.status(403).json({ 
        success: false, 
        message: "Энэ үйлдлийг хийх эрх танд байхгүй байна." 
      });
    }

    // 4. Дараагийн функцүүдэд ашиглаж болохоор хэрэглэгчийн мэдээллийг req-д хадгалах
    req.admin = decoded;

    // Бүх шалгалт амжилттай бол дараагийн алхам руу шилжинэ
    next();
  } catch (error) {
    // 401 Unauthorized: Токен хүчингүй эсвэл хугацаа нь дууссан үед
    console.error("JWT Баталгаажуулалтын алдаа:", error.message);
    return res.status(401).json({ 
      success: false, 
      message: "Таны нэвтрэх хугацаа дууссан эсвэл токен хүчингүй байна." 
    });
  }
}