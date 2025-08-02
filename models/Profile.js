import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  age: Number,
  height: Number,
  weight: Number,
  goal: String,
  allergies: String,
  dietType: String,
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
