// backend/models/Progress.js
import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  day: String,
  progress: Number
});

export default mongoose.model("Progress", progressSchema);
