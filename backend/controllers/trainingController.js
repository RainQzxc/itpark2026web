import Training from "../models/trainingModel.js";

/* GET ALL */
export const getTraining = async (req, res) => {
  try {
    const list = await Training.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET ONE */
export const getSingleTraining = async (req, res) => {
  try {
    const item = await Training.findById(req.params.id);
    res.json(item);
  } catch {
    res.status(404).json({ error: "Training not found" });
  }
};

/* CREATE */
export const addTraining = async (req, res) => {
  try {
    const newTraining = new Training(req.body);
    await newTraining.save();
    res.json({ success: true, message: "TRAINING ADDED", data: newTraining });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/* UPDATE */
export const updateTraining = async (req, res) => {
  try {
    const updated = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json({ success: true, message: "UPDATED", data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/* DELETE */
export const deleteTraining = async (req, res) => {
  try {
    await Training.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "DELETED" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
