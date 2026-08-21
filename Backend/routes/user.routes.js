// routes/user.routes.js

const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const blacklistController = require("../models/blacklist.model.js");

const router = express.Router();

// ============================
// Validation Rules for Register
// ============================
const registerValidators = [
  body("fullname.firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),

  body("fullname.lastName")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please use a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 12 })
    .withMessage("Password must be at least 12 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/)
    .withMessage(
      "Password must contain uppercase, lowercase, number and special character",
    ),
];

// ============================
// Validation Rules for Login
// ============================
const loginValidators = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please use a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

// ============================
// Register Route
// POST /users/register
// ============================
router.post("/register", registerValidators, userController.register);

// ============================
// Login Route
// POST /users/login
// ============================
router.post("/login", loginValidators, userController.loginUser);

// ============================
// Profile Route
// GET /users/profile
// ============================
router.get("/profile", authMiddleware.authUser, userController.getProfile);

// ============================
// Login Route
// POST /users/logout
// ============================
router.post("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
