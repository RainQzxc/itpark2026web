import dotenv from "dotenv";
// ⬅⬅⬅ ENV хамгийн түрүүнд ачаалдаг байх ёстой
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

// DEBUG LOGS — env уншиж байгаа эсэхийг баталгаажуулна
console.log("🔍 CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("🔍 API KEY:", process.env.CLOUDINARY_API_KEY);
console.log("🔍 API SECRET LOADED:", process.env.CLOUDINARY_API_SECRET ? "YES" : "NO");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
