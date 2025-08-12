// backend/models/Meal.js
import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  meal: String,
  food: String,
  calories: Number
});

export default mongoose.model("Meal", mealSchema);
