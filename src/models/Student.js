const mongoose = require("mongoose");

// Define the student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name field, required
  college: String, // College field, optional
  batch: String, // Batch field, optional
  status: { type: String, enum: ["placed", "not_placed"] }, // Status field, enum values "placed" or "not_placed"
  dsaScore: Number, // DSA (Data Structures and Algorithms) score field, optional
  webDScore: Number, // Web Development score field, optional
  reactScore: Number, // React score field, optional
  interviews: [ // Array of interviews
    {
      interviewId: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" }, // Reference to Interview model
      time: { type: Date, default: Date.now }, // Time of the interview, defaults to current date/time
      status: { type: String, default: "pending" }, // Status of the interview, defaults to "pending"
    },
  ],
});

// Export the Student model based on the schema
module.exports = mongoose.model("Student", studentSchema);
