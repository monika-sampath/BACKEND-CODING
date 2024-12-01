const express = require("express");
const router = express.Router();
// const authenticateJWT = require("../middlewares/authMiddleware"); // Import authentication middleware
const tutorController = require("../controllers/tutorController"); // Import the tutor controller

// Example route for creating a tutor
router.post("/tutor", tutorController.createTutor); // Create a tutor (protected route)
// router.post("/tutor", authenticateJWT, tutorController.createTutor);
// Example route for getting all tutors
router.get("/tutors", tutorController.getAllTutors); // Get all tutors (public route)

// Example route for getting a tutor by ID
router.get("/tutor/:id", tutorController.getTutorById); // Get a specific tutor by ID (public route)

// Example route for updating tutor details
router.put("/tutor/:id", authenticateJWT, tutorController.updateTutor); // Update tutor (protected route)

// Example route for deleting a tutor
router.delete("/tutor/:id", tutorController.deleteTutor); // Delete tutor (protected route)

module.exports = router;
