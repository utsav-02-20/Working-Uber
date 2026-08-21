// models/user.model.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ============================
// User Schema
// ============================
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
                trim: true,
                minlength: [3, "Last name must be at least 3 characters long"]
            }
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
        },

        password: {
            type: String,
            required: true,
            minlength: [12, "Password must be at least 12 characters long"],
            select: false, // Hide password in queries by default
            match: [
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/,
                "Password must contain uppercase, lowercase, number and special character"
            ]
        },

        // Used later for realtime ride updates
        socketId: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

// ============================
// Generate JWT Token
// ============================
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

// ============================
// Compare Password
// ============================
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// ============================
// Hash Password (Static Method)
// ============================
userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// ============================
// Remove sensitive fields from API response
// ============================
userSchema.set("toJSON", {
    transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

// Create model
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;