const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema(
  {
    fullname: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
        trim: true,
      },

      lastName: {
        type: String,
        trim: true,
        minlength: [3, "Last name must be at least 3 characters long"],
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: [12, "Password must be at least 12 characters long"],
      select: false,
    },

    socketId: {
      type: String,
      default: null,
    },

    isAvailable: {
      type: Boolean,
      default: false,
    },

    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },

    vehicle: {
      color: {
        type: String,
        required: true,
      },

      plate: {
        type: String,
        required: true,
        unique: true,
      },

      capacity: {
        type: Number,
        required: true,
        min: 1,
      },

      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "bike", "auto"],
      },
      vehicleModel: {
        type: String, 
        require: true, 
        minlength:[8 , "Enter valid Vehicle Model"],
      },
    },
  },
  {
    timestamps: true,
  }
);


// Hash Password
captainSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare Password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT
captainSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

// Hash password before saving
captainSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("Captain", captainSchema);