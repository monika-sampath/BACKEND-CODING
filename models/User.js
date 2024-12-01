// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "tutor"], required: true },
    profile: {
      name: String,
      bio: String,
      preferences: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
