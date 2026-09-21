import Training from "../models/trainingModel.js";
import {
  cleanBoolean,
  cleanStringArray,
  cleanText,
  cleanUrl,
  pickFields,
  sanitizeRichHtml,
} from "../utils/contentSecurity.js";

const cleanTrainingPayload = (body = {}) => {
  const picked = pickFields(body, [
    "title",
    "shortDesc",
    "longDesc",
    "duration",
    "expire",
    "price",
    "certificate",
    "lunch",
    "status",
    "teacher",
    "requirements",
    "program",
    "image",
    "registerLink",
    "detailsLink",
  ]);

  return {
    title: cleanText(picked.title, 200),
    shortDesc: cleanText(picked.shortDesc, 1000),
    longDesc: sanitizeRichHtml(picked.longDesc),
    duration: {
      start: cleanText(picked.duration?.start, 80),
      end: cleanText(picked.duration?.end, 80),
    },
    expire: cleanText(picked.expire, 80),
    price: cleanText(picked.price, 80),
    certificate: cleanBoolean(picked.certificate),
    lunch: cleanBoolean(picked.lunch),
    status: cleanText(picked.status, 80),
    teacher: sanitizeRichHtml(picked.teacher, 20000),
    requirements: cleanStringArray(picked.requirements),
    program: cleanStringArray(picked.program),
    image: cleanUrl(picked.image),
    registerLink: cleanUrl(picked.registerLink),
    detailsLink: cleanBoolean(picked.detailsLink),
  };
};

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
    const payload = cleanTrainingPayload(req.body);
    if (!payload.title) {
      return res.status(400).json({ success: false, error: "Training title is required" });
    }

    const newTraining = new Training(payload);
    await newTraining.save();
    res.json({ success: true, message: "TRAINING ADDED", data: newTraining });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/* UPDATE */
export const updateTraining = async (req, res) => {
  try {
    const payload = cleanTrainingPayload(req.body);
    if (!payload.title) {
      return res.status(400).json({ success: false, error: "Training title is required" });
    }

    const updated = await Training.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
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
