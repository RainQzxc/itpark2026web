// lib/api.js
export const API_BASE = import.meta.env.MODE === "development" 
  ? "http://localhost:5050"  // Хөгжүүлэлтийн үед
  : "https://itpark-backend.onrender.com"; // Сервер дээр ажиллах үед

export const getHeaders = () => ({
  "Content-Type": "application/json",
});