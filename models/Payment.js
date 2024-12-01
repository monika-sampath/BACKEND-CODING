// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson", // Reference to the Lesson model
      required: true,
    },
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
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
