// backend/models/Workout.js
import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  workouts: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
      duration: { type: Number, required: true }
    }
  ]
});

export default mongoose.model("Workout", workoutSchema);
