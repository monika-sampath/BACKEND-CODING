// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const bodyParser = require("body-parser");


// Import route files
const tutorRoutes = require("./routes/tutorRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes"); // Adjust the path

// Load environment variables
dotenv.config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api", tutorRoutes);
app.use("/api", lessonRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/courses", courseRoutes);

// Routes
app.use("/api/users", profileRoutes);

// Razorpay instance 
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Add your Razorpay Key ID 
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Add your Razorpay Secret 
});
// Route to create Razorpay order 
app.post("/api/razorpay/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body; const options = {
      amount: amount, // amount in the smallest currency unit (e.g., 50000 paise = ₹500) 
      currency: currency,
      receipt: `receipt_${Date.now()

      }`,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  }
  catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Unable to create Razorpay order" });
  }
});
// Route to verify Razorpay payment 
app.post("/api/razorpay/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature === razorpay_signature) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Learning Management System API!");
});

// Server setup
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
