import Staff from "../models/Staff.js";
import { cleanText, pickFields } from "../utils/contentSecurity.js";

const cleanStaffPayload = (body = {}) => {
  const picked = pickFields(body, ["organization", "position", "name", "room", "phone", "email"]);
  return {
    organization: cleanText(picked.organization, 160),
    position: cleanText(picked.position, 160),
    name: cleanText(picked.name, 160),
    room: cleanText(picked.room, 80),
    phone: cleanText(picked.phone, 80),
    email: cleanText(picked.email, 160),
  };
};

export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const createStaff = async (req, res) => {
  try {
    const payload = cleanStaffPayload(req.body);
    if (!payload.organization || !payload.position || !payload.name) {
      return res.status(400).json({ success: false, error: "Required staff fields are missing" });
    }

    const newStaff = new Staff(payload);
    await newStaff.save();
    res.json({ success: true, message: "Staff added", staff: newStaff });
  } catch (err) {
    res.status(500).json({ success: false, error: "Insert Error" });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const payload = cleanStaffPayload(req.body);
    if (!payload.organization || !payload.position || !payload.name) {
      return res.status(400).json({ success: false, error: "Required staff fields are missing" });
    }

    const updated = await Staff.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    res.json({ success: true, staff: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: "Update Error" });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Delete Error" });
  }
};

export const getOneStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    res.json(staff);
  } catch (err) {
    res.status(500).json({ success: false, error: "Not Found" });
  }
};
