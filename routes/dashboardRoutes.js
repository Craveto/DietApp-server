// backend/routes/dashboardRoutes.js
import express from "express";
import Meal from "../models/Meal.js";
import Workout from "../models/Workout.js";
import Progress from "../models/Progress.js";

const router = express.Router();

/* -------------------- GET Routes -------------------- */

// Get meals for a user
// GET meals for a user
router.get("/meals/:userId", async (req, res) => {
    console.log("GET /meals called with userId:", req.params.userId);
  try {
    const meals = await Meal.find({ userId: req.params.userId });
    res.json({ meals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Get workouts for a user
router.get("/workouts/:userId", async (req, res) => {
  try {
    const plan = await Workout.findOne({ userId: req.params.userId });
    res.json(plan || { workouts: [] });
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
// Add or update meal plan
// POST (create/update) meals for a user
router.post("/meals/:userId", async (req, res) => {
    console.log("POST /meals called");
  console.log("Params:", req.params);
  console.log("Body:", req.body);
  try {
    const { meals } = req.body;
    if (!meals || !Array.isArray(meals)) {
      return res.status(400).json({ error: "Meals must be an array" });
    }

    // Remove old meals & insert new ones
    await Meal.deleteMany({ userId: req.params.userId });
    const newMeals = meals.map((m) => ({ ...m, userId: req.params.userId }));
    const savedMeals = await Meal.insertMany(newMeals);

    res.json({ meals: savedMeals });
  } catch (err) {
    console.error("POST /meals error:", err);
    res.status(500).json({ error: err.message });
  }
});



// Add a new workout
// POST /workouts/:userId
router.post("/workouts/:userId", async (req, res) => {
  try {
    const { workouts } = req.body;

    if (!Array.isArray(workouts) || workouts.length === 0) {
      return res.status(400).json({ message: "Workouts array is required" });
    }

    const savedWorkoutPlan = new Workout({
      userId: req.params.userId,
      workouts
    });

    await savedWorkoutPlan.save();
    res.status(201).json(savedWorkoutPlan);
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



// delete routers 

// DELETE meals for a user
router.delete("/meals/:userId", async (req, res) => {
    console.log("DELETE /meals called with userId:", req.params.userId);
  try {
    await Meal.deleteMany({ userId: req.params.userId });
    res.json({ message: "Meal plan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// backend/routes/dashboardRoutes.js
router.delete("/workouts/:userId", async (req, res) => {
  try {
    const deleted = await Workout.findOneAndDelete({ userId: req.params.userId });

    if (!deleted) {
      return res.status(404).json({ message: "No workout plan found for this user" });
    }

    res.json({ message: "Workout plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
