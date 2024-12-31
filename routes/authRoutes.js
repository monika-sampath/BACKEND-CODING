// routes/authRoutes.js
const express = require("express");
const { register, login, getAllUsers, updateUser, deleteUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers); // Protected route
router.put("/users/:id", updateUser); // Protected route
router.delete("/users/:id", deleteUser); // Protected route

module.exports = router;
