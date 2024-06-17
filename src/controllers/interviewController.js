const Interview = require("../models/Interview");
const Student = require("../models/Student");

const interviewController = {
  // Get all interviews
  getAllInterviews: async (req, res) => {
    try {
      // Fetch all interviews from the database
      const interviews = await Interview.find({});
      // Render the interviewList view with the fetched interviews
      res.render("interviewList", { interviews });
    } catch (error) {
      console.error(error);
      // Handle server error if fetching interviews fails
      res.status(500).send("Internal Server Error");
    }
  },

  // Add a new interview
  addNewInterview: async (req, res) => {
    try {
      const { company, date, time, student, status } = req.body;

      // Create a new interview instance
      const newInterview = new Interview({
        company,
        date,
        time,
        status,
      });

      // Save the new interview to the database
      const savedInterview = await newInterview.save();

      // Update the selected student with the new interview ID
      await Student.findByIdAndUpdate(student, {
        $push: {
          interviews: {
            _id: savedInterview._id,
          },
        },
      });

      // Flash success message and redirect to interviews page
      req.flash("success", "New interview scheduled");
      res.redirect("/interviews");
    } catch (error) {
      console.error(error);
      // Handle error if adding new interview fails
      req.flash("error", "Error scheduling interview");
      res.redirect("/interviews");
    }
  },

  // Render the add new interview form with list of students
  getAddNewInterview: async (req, res) => {
    try {
      // Fetch all students from the database to populate the form
      const students = await Student.find({}, "_id name");
      res.render("addInterview", { students });
    } catch (err) {
      console.error(err);
      // Handle server error if fetching students fails
      res.status(500).send("Internal Server Error");
    }
  },

  // Render the edit interview form with selected interview details and all students
  getEditInterview: async (req, res) => {
    try {
      const interviewId = req.params.id;
      // Fetch the interview details by ID
      const interview = await Interview.findById(interviewId);
      // Fetch all students for selection in the edit form
      const students = await Student.find({});
      // Render the editInterview view with interview and students data
      res.render("editInterview", { interview, students });
    } catch (error) {
      console.error(error);
      // Handle server error if fetching interview details fails
      res.status(500).send("Internal Server Error");
    }
  },

  // Update an existing interview
  postEditInterview: async (req, res) => {
    try {
      const { company, date, time, students, status } = req.body;
      const interviewId = req.params.id;

      // Update the interview details in the database
      await Interview.findByIdAndUpdate(interviewId, {
        company,
        date,
        time,
        status,
      });

      // Update each selected student with the updated interview ID
      await Promise.all(
        (Array.isArray(students) ? students : [students]).map(
          async (studentId) => {
            await Student.findByIdAndUpdate(studentId, {
              $push: {
                interviews: {
                  _id: interviewId,
                },
              },
            });
          }
        )
      );

      // Flash success message and redirect to interviews page
      req.flash("success", "Interview updated successfully");
      res.redirect("/interviews");
    } catch (error) {
      console.error(error);
      // Handle server error if updating interview fails
      req.flash("error", "Error updating interview");
      res.redirect("/interviews");
    }
  },

  // Get applicants for a specific interview
  getInterviewApplicants: async (req, res) => {
    try {
      const interviewId = req.params.id;

      // Fetch the interview details by ID
      const interview = await Interview.findById(interviewId);

      // Find students where interviews array contains the interview ID
      const students = await Student.find({ "interviews._id": interviewId });

      // Render the interviewApplicants view with interview and applicants data
      res.render("interviewApplicants", { interview, students });
    } catch (error) {
      console.error(error);
      // Handle server error if fetching interview applicants fails
      res.status(500).send("Internal Server Error");
    }
  },

  // Update student status within a specific interview
  postUpdateStudentStatus: async (req, res) => {
    try {
      const { studentId, newStatus } = req.body;
      const interviewId = req.params.id;

      // Update the student's status within the specific interview
      await Student.findOneAndUpdate(
        { _id: studentId, "interviews._id": interviewId },
        { $set: { "interviews.$.status": newStatus } }
      );

      // Fetch the student after updating the interview status
      const student = await Student.findById(studentId).lean();

      // Check if there is any interview with status "placed"
      const hasPlacedInterview = student.interviews.some(
        (interview) => interview.status === "placed"
      );

      // Determine the new student status based on interview statuses
      const updatedStudentStatus = hasPlacedInterview ? "placed" : "not_placed";

      // Update the student's overall status
      await Student.findByIdAndUpdate(studentId, {
        $set: { status: updatedStudentStatus },
      });

      // Flash success message and redirect to interview applicants page
      req.flash("success", "Student status updated successfully");
      res.redirect(`/interviews/${interviewId}/applicants`);
    } catch (error) {
      console.error(error);
      // Handle server error if updating student status fails
      req.flash("error", "Error updating student status");
      res.redirect(`/interviews/${interviewId}/applicants`);
    }
  },
};

module.exports = interviewController;
