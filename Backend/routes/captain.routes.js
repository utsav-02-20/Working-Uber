const express = require("express");
const { body } = require("express-validator");

const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// ============================
// Validation Rules for Captain Register
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
    .withMessage("Password must be at least 12 characters long"),

  // Vehicle Details
  body("vehicle.color")
    .trim()
    .notEmpty()
    .withMessage("Vehicle color is required"),

  body("vehicle.plate")
    .trim()
    .notEmpty()
    .withMessage("Vehicle plate number is required"),

  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("Vehicle capacity must be at least 1"),

  body("vehicle.vehicleType")
    .isIn(["car", "bike", "auto"])
    .withMessage("Vehicle type must be car, bike or auto"),

  body("vehicle.vehicleModel")
    .trim()
    .notEmpty()
    .withMessage("Vehicle model is required")
    .isLength({ min: 3 })
    .withMessage("Vehicle model must be at least 3 characters long"),
];

// ============================
// Validation Rules for Captain Login
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
// Register Captain
// POST /captains/register
// ============================
router.post("/register", registerValidators, captainController.registerCaptain);

// ============================
// Login Captain
// POST /captains/login
// ============================
router.post("/login", loginValidators, captainController.loginCaptain);

// ============================
// Captain Profile
// GET /captains/profile
// ============================
router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile,
);

// ============================
// Captain Logout
// POST /captains/logout
// ============================
router.post(
  "/logout",
  authMiddleware.authCaptain,
  captainController.logoutCaptain,
);

module.exports = router;
