import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  section: String,
  title: String,
  content: String,
  image: String
});

export default mongoose.model("About", AboutSchema);
