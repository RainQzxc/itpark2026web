import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      minlength: 5,
      maxlength: 5,
      trim: true,
      lowercase: true,
    },
    shortText: { type: String, default: "" },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("News", NewsSchema);
