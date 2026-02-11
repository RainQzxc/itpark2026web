import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
  organization: { type: String, required: true },
  position: { type: String, required: true },
  name: { type: String, required: true },
  room: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Staff", StaffSchema);
