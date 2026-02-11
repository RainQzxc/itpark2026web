import mongoose from "mongoose";

const TrainingSchema = new mongoose.Schema({
  title: String,
  shortDesc: String,
  longDesc: String,

  duration: {
    start: String,
    end: String
  },

  expire: String,
  price: String,

  certificate: Boolean,
  lunch: Boolean,
  status: String,

  teacher: String,

  requirements: [String],
  program: [String],

  image: String,
  registerLink: String,
  detailsLink: Boolean
}, { timestamps: true });

export default mongoose.model("Training", TrainingSchema);
