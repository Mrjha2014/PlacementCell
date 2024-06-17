const mongoose = require("mongoose");

// Define the interview schema
const interviewSchema = new mongoose.Schema({
  company: String, // Company name for the interview, stored as a string
  date: { // Date of the interview
    type: String, // Stored as a string
    required: true, // Required field
  },
  time: { // Time of the interview
    type: String, // Stored as a string
    required: true, // Required field
  },
  status: String, // Status of the interview (e.g., scheduled, completed, pending, etc.)
});

// Export the Interview model based on the schema
module.exports = mongoose.model("Interview", interviewSchema);
