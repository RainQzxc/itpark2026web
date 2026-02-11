// models/Contact.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  vision_title: { type: String, default: "" },
  vision_text: { type: String, default: "" },

  mission_title: { type: String, default: "" },
  mission_text: { type: String, default: "" },

  priority_title: { type: String, default: "" },
  priority_list: { type: [String], default: [] },

  duty_title: { type: String, default: "" },
  duty_text: { type: String, default: "" },

  strategy_title: { type: String, default: "" },
  strategy_text: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("Contact", ContactSchema);
