import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["Үндсэн Инкубатор", "Цахим Инкубатор"],
      required: true,
    },
    name: { type: String },
    image: { type: String, required: true },
    link: { type: String, default: "#" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Partner", PartnerSchema);
