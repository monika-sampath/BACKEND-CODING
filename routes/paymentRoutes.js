const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController"); // Ensure the correct path

// POST route to create a Razorpay payment order
router.post("/create-order", paymentController.createOrder); // Ensure this matches the function in the controller

module.exports = router;
