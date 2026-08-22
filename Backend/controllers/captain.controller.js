const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklist.model");

// ======================================================
// Register Captain Controller
// POST /captains/register
// ======================================================
module.exports.registerCaptain = async (req, res) => {
  // Check validation errors from express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { fullname, email, password, vehicle } = req.body;

    // Register captain using service
    const { captain, token } = await captainService.register({
      fullname,
      email,
      password,
      vehicle,
    });

    // Hide password before sending response
    captain.password = undefined;

    return res.status(201).json({
      message: "Captain registered successfully",
      token,
      captain,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// ======================================================
// Login Captain Controller
// POST /captains/login
// ======================================================
module.exports.loginCaptain = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { email, password } = req.body;

    // Authenticate captain
    const { captain, token } = await captainService.login(email, password);

    // Hide password before sending response
    captain.password = undefined;

    // Save JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours (matches JWT expiry)
    });

    return res.status(200).json({
      message: "Captain login successful",
      token,
      captain,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

// ======================================================
// Get Captain Profile
// GET /captains/profile
// Protected Route
// ======================================================
module.exports.getCaptainProfile = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Captain profile retrieved successfully",
      captain: req.captain,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// ======================================================
// Logout Captain Controller
// POST /captains/logout
// Protected Route
// ======================================================
module.exports.logoutCaptain = async (req, res) => {
  try {
    // Get token from cookie or Authorization header
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    // Store token in blacklist so it can't be used again
    if (token) {
      await BlacklistToken.create({ token });
    }

    // Remove JWT cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Captain logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};