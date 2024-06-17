const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Email field, required and unique
  name: { type: String, required: true }, // Name field, required
  password: { type: String, required: true }, // Password field, required
});

// Hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // If password is not modified, move to next middleware
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt with cost factor 10
    this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
    next(); // Move to the next middleware or save operation
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

// Export the User model based on the schema
module.exports = mongoose.model("User", userSchema);
