// routes/lessonRoutes.js

const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware"); // Import JWT middleware
const lessonController = require("../controllers/lessonController"); // Import lesson controller

// POST route to create a new lesson
router.post("/lesson", lessonController.createLesson);
// router.post("/lesson", authenticateJWT, lessonController.createLesson);

// GET route to fetch all lessons
router.get("/lessons", lessonController.getAllLessons);

// GET route to fetch lesson by ID
router.get("/lesson/:id", lessonController.getLessonById);

// PUT route to update a lesson by ID
router.put("/lesson/:id", authenticateJWT, lessonController.updateLesson);

// DELETE route to delete a lesson by ID
router.delete("/lesson/:id", authenticateJWT, lessonController.deleteLesson);

module.exports = router;
