// controllers/user.controller.js

const userService = require("../services/user.service.js");
const { validationResult } = require("express-validator");

// ============================
// Register User Controller
// ============================
module.exports.register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fullname, email, password } = req.body;

        const { user, token } = await userService.register({
            fullname,
            email,
            password
        });

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// ============================
// Login User Controller
// ============================
module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const { user, token } = await userService.login(email, password);

         // Save JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,      // true in production with HTTPS
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

// ============================
// Get User Profile Controller
// GET /users/profile
// ============================
module.exports.getProfile = async (req, res) => {

    try {
        // req.user comes from auth.middleware.js
        return res.status(200).json({
            message: "User profile retrieved successfully",
            user: req.user
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};