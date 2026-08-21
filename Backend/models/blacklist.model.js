// models/blacklist.model.js

const mongoose = require("mongoose");

// Schema to store blacklisted JWT tokens
const blacklistTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        },

        // Automatically delete document after 24 hours
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 24 * 60 * 60, // 24 hours (TTL Index)
        },
    },
    {
        versionKey: false,
    }
);

// Export model
module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);