// controllers/paymentController.js
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables
// Initialize Razorpay instance with keys from .env file
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a payment order
const createOrder = async (req, res) => {
  const {
    lessonId,
    studentId,
    tutorId,
    amount,
    status,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  } = req.body;

  try {
    const options = {
      lessonId,
      studentId,
      tutorId,
      status,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      amount: amount * 100, // Amount in paise (1 INR = 100 paise)
      // currency,
      receipt: `receipt_${Math.random().toString(36).substring(7)}`,
      payment_capture: 1,
    };

    // Create a new order on Razorpay
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating Razorpay order", error: err.message });
  }
};

// Export the controller function
module.exports = {
  createOrder,
};
