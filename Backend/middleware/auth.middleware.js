const usermodel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        // check for token 
        if(!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await usermodel.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ error: "User not found." });
            }
            req.user = user;
            return next();
        } catch (err) {
            return res.status(401).json({ error: "Invalid token." });
        }
    } catch (error) {
        return res.status(401).json({ error: "Invalid token." });
    } 
} ; 