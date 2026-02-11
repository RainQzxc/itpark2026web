// models/Alert.js
import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
  trainingId: { type: String, required: true },

  lastname: String,
  name: String,
  register: String,
  email: String,

  phone1: String,
  phone2: String,

  company: String,
  position: String,

  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Alert", AlertSchema);
