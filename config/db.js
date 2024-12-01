// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;