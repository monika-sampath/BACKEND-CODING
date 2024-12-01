// controllers/profileController.js
const User = require("../models/User"); // Make sure you have the User model defined

// GET profile details
const getProfile = async (req, res) => {
  try {
    // Assuming you are using JWT to authenticate, you get the userId from the token
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving profile", error: err.message });
  }
};

// // Update student profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const { name, email, preferences } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, email, preferences },
//       { new: true }
//     );

//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json(user); // Send updated profile data
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// Export the controller functions
module.exports = {
  getProfile,
};
