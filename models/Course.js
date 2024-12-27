const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    course_name: {
      type: String,
      required: true,
    },
    sub_title: {
      type: String,
      required: true,
    },
    price: {
      type: Number, // Changed to Number for proper calculations
      required: true,
    },
    duration: {
      type: Number, // Duration in days
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    zoomLink: {
      type: String,
      required: false, // Optional field
      validate: {
        validator: function (v) {
          // Simple validation for a Zoom link
          return /^https:\/\/us\d{2,}\.web\.zoom\.us\/j\/\d+/.test(v);
        },
        message: (props) => `${props.value} is not a valid Zoom link!`,
      },
    },
    feedback: {
      type: [String], // Array of feedback strings
      required: false,
      default: null, // Defaults to null if no feedback is provided
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
