// controllers/lessonController.js

const Lesson = require('../models/Lesson');

// Create a new lesson
const createLesson = async (req, res) => {
  try {
    const {
      studentId,
      tutorId,
      subject,
      scheduledTime,
      duration,
      status,
      zoomLink,
      feedback,
    } = req.body;

    const newLesson = new Lesson({
      studentId,
      tutorId,
      subject,
      scheduledTime,
      duration,
      status,
      zoomLink,
      feedback,
    });
    await newLesson.save();
    res.status(201).json(newLesson); // Return the created lesson
  } catch (err) {
    res.status(500).json({ message: 'Error creating lesson', error: err.message });
  }
};

// Get all lessons
const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons); // Return all lessons
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lessons', error: err.message });
  }
};

// Get lesson by ID
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.status(200).json(lesson); // Return the found lesson
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lesson', error: err.message });
  }
};
// Update a lesson by ID
const updateLesson = async (req, res) => {
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.status(200).json(updatedLesson); // Return the updated lesson
  } catch (err) {
    res.status(500).json({ message: 'Error updating lesson', error: err.message });
  }
};

// Delete a lesson by ID
const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting lesson', error: err.message });
  }
};
module.exports = {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson
};