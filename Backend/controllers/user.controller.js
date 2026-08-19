const userService = require('../services/user.service.js');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res, next) => {
    const { fullname, email, password } = req.body;

    // Check validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        // Hash password
        const hashPassword = await userService.hashPassword(password);

        // Register user
        const user = await userService.register({
            fullname,
            email,
            password: hashPassword
        });

        // Generate JWT token
        const token = user.generateAuthToken();

        // Send ONE response
        return res.status(201).json({
            message: 'User registered successfully',
            user,
            token
        });

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};