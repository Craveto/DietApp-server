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

// Delete meal plan for a user
// router.delete("/meals/:userId", async (req, res) => {
//   try {
//     await MealPlan.findOneAndDelete({ userId: req.params.userId });
//     res.json({ message: "Meal plan deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

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


export default router;
