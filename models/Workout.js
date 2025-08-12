// backend/models/Workout.js
import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  workout: String,
  sets: Number,
  reps: String
});

export default mongoose.model("Workout", workoutSchema);
