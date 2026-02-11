import Staff from "../models/Staff.js";

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
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.json({ success: true, message: "Staff added", staff: newStaff });
  } catch (err) {
    res.status(500).json({ success: false, error: "Insert Error" });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
