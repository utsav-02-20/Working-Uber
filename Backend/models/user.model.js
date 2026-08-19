const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        fullname: {
            firstName: {
                type: String,
                required: true,
                minlength: [3, "First name must be at least 3 characters long"],
                trim: true
            },

            lastName: {
                type: String,
                minlength: [3, "Last name must be at least 3 characters long"],
                trim: true
            }
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please use a valid email address"
            ]
        },

        password: {
            type: String,
            required: true,
            minlength: [12, "Password must be at least 12 characters long"],
            select: false,
            match: [
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ]
        },

        // Track live location/socket connection
        socketId: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

// Generate JWT
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET
        // { expiresIn: "1h" }
    );
};

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Hash password
userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const User = mongoose.model("User", userSchema);

module.exports = User;