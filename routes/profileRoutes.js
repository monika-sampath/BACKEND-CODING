const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController"); // Ensure the correct path to the controller

// GET route to fetch the profile of the logged-in user
router.get("/profile", profileController.getProfile); // Make sure the function exists and is being used

module.exports = router;
