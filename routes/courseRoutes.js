const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController"); // Adjust the path based on your folder structure

// Create a new course
router.post("/", courseController.createCourse);

// Get all courses
router.get("/", courseController.getAllCourses);

// Get a course by ID
router.get("/:id", courseController.getCourseById);

// Update a course
router.put("/:id", courseController.updateCourse);

// Delete a course
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
