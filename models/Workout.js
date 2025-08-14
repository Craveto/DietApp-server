// backend/models/Workout.js
import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  // Workout Details
  workout: { type: String, required: true }, // e.g., Push Ups
  sets: { type: Number, required: true },
  reps: { type: String, required: true }, // e.g., "10-12"

  // Optional field to track type (workout or meal)
  type: { type: String, enum: ["workout", "meal"], default: "workout" },

  // Meal Plan fields (used only when type is "meal")
  mealName: { type: String },       // e.g., Breakfast
  foodItems: [{ type: String }],    // e.g., ["Oats", "Milk", "Banana"]
  calories: { type: Number },       // e.g., 350
  notes: { type: String },          // Optional notes like "High protein breakfast"

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Workout", workoutSchema);
