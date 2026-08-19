const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();
const userController = require("../controllers/user.controller.js");

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
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/
        )
        .withMessage(
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
];

router.post(
    "/register",
    registerValidators,
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    },
    userController.register
);

module.exports = router;