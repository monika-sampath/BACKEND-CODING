// const express = require("express");
// const router = express.Router();
// const profileController = require("../controllers/profileController"); // Ensure the correct path to the controller

// // GET route to fetch the profile of the logged-in user
// router.get("/profile", profileController.getProfile); // Make sure the function exists and is being used

// // Route to update a user profile
// router.put('/api/users/:userId', updateProfile);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

// Route to get the profile of a user
router.get("/:username/profile", getProfile);

// Route to update the profile of a user
router.put("/:username/profile", updateProfile);

module.exports = router;
