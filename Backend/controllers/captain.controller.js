const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklist.model");

// ============================
// Register Captain Controller
// ============================
module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname, email, password, vehicle } = req.body;

    const { captain, token } = await captainService.register({
      fullname,
      email,
      password,
      vehicle,
    });

    return res.status(201).json({
      message: "Captain registered successfully",
      token,
      captain,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// ============================
// Login Captain Controller
// ============================
module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const { captain, token } = await captainService.login(email, password);

    // Save JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Captain login successful",
      token,
      captain,
    });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

// ============================
// Get Captain Profile
// GET /captains/profile
// ============================
module.exports.getCaptainProfile = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Captain profile retrieved successfully",
      captain: req.captain,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ============================
// Logout Captain Controller
// POST /captains/logout
// ============================
module.exports.logoutCaptain = async (req, res) => {
  try {
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      await BlacklistToken.create({ token });
    }

    res.clearCookie("token");

    return res.status(200).json({
      message: "Captain logout successful",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};