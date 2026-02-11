import mongoose from "mongoose";

const RentSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  isRented: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Rent", RentSchema);