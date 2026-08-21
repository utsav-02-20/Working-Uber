// services/user.service.js

const UserModel = require("../models/user.model.js");

// ============================
// Register New User
// ============================
module.exports.register = async ({ fullname, email, password }) => {

    // Validate required fields
    if (!fullname?.firstName || !email || !password) {
        throw new Error("Missing required fields");
    }

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new Error("Email already in use");
    }

    // Hash password using model static method
    const hashedPassword = await UserModel.hashPassword(password);

    // Create user
    const user = await UserModel.create({
        fullname: {
            firstName: fullname.firstName,
            lastName: fullname.lastName
        },
        email,
        password: hashedPassword
    });

    // Generate JWT token
    const token = user.generateAuthToken();

    return { user, token };
};

// ============================
// Login Existing User
// ============================
module.exports.login = async (email, password) => {

    // Find user and include hidden password field
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare entered password with hashed password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = user.generateAuthToken();

    return { user, token };
};

