import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema(
  {
    totalCompanies: Number,
    totalJobs: Number,
    bestGraduates: Number,
    activeIncubator: Number,
    currentJobs: Number,
    successfulGraduates: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Stats", StatsSchema);
