const Tutor = require("../models/Tutor"); // Import the Tutor model

// Create a new tutor
const createTutor = async (req, res) => {
  try {
    const {
      name,
      userId,
      subjects,
      bio,
      qualifications,
      experience,
      ratings,
      hourlyRate,
      reviews,
    } = req.body;
    const tutor = new Tutor({
      name,
      userId,
      subjects,
      bio,
      qualifications,
      experience,
      ratings,
      hourlyRate,
      reviews,
    });

    await tutor.save();
    res.status(201).json(tutor); // Return the created tutor
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating tutor", error: err.message });
  }
};

// Get all tutors
const getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.status(200).json(tutors); // Return all tutors
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tutors", error: err.message });
  }
};
// Get a specific tutor by ID
const getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.status(200).json(tutor); // Return the found tutor
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tutor", error: err.message });
  }
};

// Update a tutor's information
const updateTutor = async (req, res) => {
  try {
    const updatedTutor = await Tutor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.status(200).json(updatedTutor); // Return the updated tutor
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating tutor", error: err.message });
  }
};
// Delete a tutor by ID
const deleteTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndDelete(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.status(200).json({ message: "Tutor deleted successfully" }); // Return success message
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting tutor", error: err.message });
  }
};

module.exports = {
  createTutor,
  getAllTutors,
  getTutorById,
  updateTutor,
  deleteTutor,
};
