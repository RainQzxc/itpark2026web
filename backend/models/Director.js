import mongoose from "mongoose";

const DirectorSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  text: { type: String, default: "" },
  name: { type: String, default: "" },
  position: { type: String, default: "" },
  image: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Director", DirectorSchema);
