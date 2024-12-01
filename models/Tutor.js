// models/Tutor.js
const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    subjects: {
      type: [String],
    //   required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    qualifications: {
      type: [String],
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tutor", tutorSchema);
