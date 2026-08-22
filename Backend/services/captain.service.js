const CaptainModel = require("../models/captain.model");

// ============================
// Register New Captain
// ============================
module.exports.register = async ({
  fullname,
  email,
  password,
  vehicle,
}) => {
  // Validate required fields
  if (
    !fullname?.firstName ||
    !email ||
    !password ||
    !vehicle?.color ||
    !vehicle?.plate ||
    !vehicle?.capacity ||
    !vehicle?.vehicleType
  ) {
    throw new Error("Missing required fields");
  }

  // Check if email already exists
  const existingCaptain = await CaptainModel.findOne({ email });

  if (existingCaptain) {
    throw new Error("Email already in use");
  }

  // Hash password
  const hashedPassword = await CaptainModel.hashPassword(password);

  // Create captain
  const captain = await CaptainModel.create({
    fullname: {
      firstName: fullname.firstName,
      lastName: fullname.lastName,
    },
    email,
    password,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    },
  });

  // Generate JWT
  const token = captain.generateAuthToken();

  return { captain, token };
};

// ============================
// Login Existing Captain
// ============================
module.exports.login = async (email, password) => {
  // Find captain and include hidden password
  const captain = await CaptainModel.findOne({ email }).select("+password");

  if (!captain) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = captain.generateAuthToken();

  return { captain, token };
};