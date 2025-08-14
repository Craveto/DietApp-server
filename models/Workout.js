// backend/models/Workout.js
import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  duration: { type: Number, required: true } // in minutes
});

export default mongoose.model("Workout", workoutSchema);
