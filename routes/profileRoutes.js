import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// Save or update preferences
router.post("/", async (req, res) => {
  try {
    const { userId, age, height, weight, goal, allergies, dietType } = req.body;

    // Update if exists, otherwise create
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { age, height, weight, goal, allergies, dietType },
      { new: true, upsert: true }
    );

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch preferences by userId
router.get("/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
