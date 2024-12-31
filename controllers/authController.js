// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role, // Include role information
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role, // Include role information
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true, runValidators: true } // Return the updated document
    ).select("-password"); // Exclude password

    if (!updatedUser) return res.status(404).json({ msg: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { register, login, getAllUsers, updateUser, deleteUser };
