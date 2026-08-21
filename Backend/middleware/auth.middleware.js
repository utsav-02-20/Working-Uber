const usermodel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklist.model.js");

module.exports.authUser = async (req, res, next) => {
    try {
        // Get token from cookie or Authorization header
        const token =
            req.cookies?.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                error: "Access denied. No token provided.",
            });
        }

        // Check if token is blacklisted
        const isBlacklisted = await BlacklistToken.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({
                error: "Token has been blacklisted. Please login again.",
            });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await usermodel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                error: "User not found.",
            });
        }

        req.user = user;
        req.token = token; // Save token for logout controller

        next();
    } catch (error) {
        return res.status(401).json({
            error: "Invalid or expired token.",
        });
    }
};