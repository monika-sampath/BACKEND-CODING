// // controllers/profileController.js
// const User = require("../models/User"); // Make sure you have the User model defined

// // GET profile details
// const getProfile = async (req, res) => {
//   try {
//     // Assuming you are using JWT to authenticate, you get the userId from the token
//     const userId = req.user.id;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error retrieving profile", error: err.message });
//   }
// };

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

// // Export the controller functions
// module.exports = {
//   getProfile,
// };

const User = require("../models/User");

// Controller to get the profile
const getProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ profile: user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Controller to update the profile
const updateProfile = async (req, res) => {
  const { username } = req.params;
  const { email } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { email },
      { new: true, runValidators: true } // Return updated document and validate changes
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { getProfile, updateProfile };
// const user = await User.findById(userId); line 51
// profile: { email },line 71
