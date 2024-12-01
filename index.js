// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Import route files
const tutorRoutes = require("./routes/tutorRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api", tutorRoutes);
app.use("/api", lessonRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api", profileRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Learning Management System API!");
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
