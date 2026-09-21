import Rent from "../models/Rent.js";
import { cleanText, pickFields } from "../utils/contentSecurity.js";

// Бүх өрөөг авах
export const getRooms = async (req, res) => {
  try {
    const rooms = await Rent.find().sort({ roomNumber: 1 });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Өрөөний мэдээлэл авахад алдаа гарлаа" });
  }
};

// Төлөв өөрчлөх (Toggle)
export const toggleRentStatus = async (req, res) => {
  try {
    const room = await Rent.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Өрөө олдсонгүй" });

    room.isRented = !room.isRented;
    await room.save();
    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: "Шинэчлэхэд алдаа гарлаа" });
  }
};

// Өрөө шинээр нэмэх (Админ гараар өрөө нэмэхэд ашиглана)
export const addRoom = async (req, res) => {
  try {
    const payload = pickFields(req.body, ["roomNumber"]);
    const newRoom = new Rent({ roomNumber: cleanText(payload.roomNumber, 40) });
    await newRoom.save();
    res.json({ success: true, room: newRoom });
  } catch (err) {
    res.status(500).json({ error: "Өрөө нэмэхэд алдаа гарлаа" });
  }
};
