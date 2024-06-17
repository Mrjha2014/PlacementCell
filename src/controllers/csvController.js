const Student = require("../models/Student");
const Interview = require("../models/Interview");
const csvUtil = require("../utils/csvUtil");

const csvController = {
  downloadCsv: async (req, res) => {
    try {
      // Fetch all students with their interviews
      const students = await Student.find({}).lean();
      
      // Array to hold transformed data for CSV
      const csvData = [];

      // Loop through each student and transform data
      for (const student of students) {
        for (const interview of student.interviews) {
          // Fetch interview details from Interview collection
          const interviewDetails = await Interview.findById(interview._id).lean();

          // Create a record for each interview
          const record = {
            "Student ID": student._id,
            "Student Name": student.name,
            "Student College": student.college,
            "Student Status": student.status,
            "DSA Final Score": student.dsaScore,
            "WebD Final Score": student.webDScore,
            "React Final Score": student.reactScore,
            "Interview Date": interviewDetails.date,
            "Interview Company": interviewDetails.company,
            "Interview Student Result": interviewDetails.status
          };

          // Add record to CSV data array
          csvData.push(record);
        }
      }

      // Define the fields for CSV
      const fields = [
        "Student ID",
        "Student Name",
        "Student College",
        "Student Status",
        "DSA Final Score",
        "WebD Final Score",
        "React Final Score",
        "Interview Date",
        "Interview Company",
        "Interview Student Result"
      ];

      // Generate CSV using the csvUtil
      const csv = csvUtil.jsonToCsv(csvData, fields);

      // Send the CSV file as a response
      res.header("Content-Type", "text/csv");
      res.attachment("students.csv");
      return res.send(csv);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error generating CSV");
    }
  },
};

module.exports = csvController;
