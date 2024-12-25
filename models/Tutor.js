// models/Tutor.js
const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Refers to the user ID in the `user` collection
      required: false,
    },
    subjects: {
      type: [String], // Array of subjects
      required: true,
    },
    bio: {
      type: String,
      required: false, // Optional
    },
    qualifications: {
      type: [String], // Array of qualifications
      required: false,
    },
    experience: {
      type: String,
      required: false,
    },
    hourlyRate: {
      type: Number, // Numerical field for hourly rate
      required: false,
    },
    rating: {
      type: Number, // Numerical field for rating
      min: 0,
      max: 5,
      required: false,
    },
    reviews: {
      type: [String], // Array of strings for reviews
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tutor", tutorSchema);
