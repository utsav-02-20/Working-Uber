const UserModel = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

module.exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
module.exports.register = async ({ fullname, email, password }) => {

    // Validate required fields
    if (!fullname?.firstName || !email || !password) {
        throw new Error('Missing required fields');
    }

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new Error('Email already in use');
    }

    // Create new user
    const newUser = new UserModel({
        fullname: {
            firstName: fullname.firstName,
            lastName: fullname.lastName
        },
        email,
        password
    });

    // Save user to MongoDB
    return await newUser.save();
};