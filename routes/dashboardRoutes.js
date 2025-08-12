// backend/routes/dashboardRoutes.js
import express from "express";
import Meal from "../models/Meal.js";
import Workout from "../models/Workout.js";
import Progress from "../models/Progress.js";

const router = express.Router();

/* -------------------- GET Routes -------------------- */

// Get meals for a user
router.get("/meals/:userId", async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.params.userId });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get workouts for a user
router.get("/workouts/:userId", async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get progress for a user
router.get("/progress/:userId", async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* -------------------- POST Routes -------------------- */

// Add a new meal
router.post("/meals", async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).json(meal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a new workout
router.post("/workouts", async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add new progress entry
router.post("/progress", async (req, res) => {
  try {
    const progress = new Progress(req.body);
    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
