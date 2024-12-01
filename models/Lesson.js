// models/Lesson.js
const mongoose = require("mongoose");
const lessonSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (student)
      required: true,
    },
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor", // Reference to the Tutor model
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    scheduledTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    zoomLink: {
      type: String,
    },
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review", // Reference to the Review model
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Lesson", lessonSchema);
