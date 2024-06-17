const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");

// List of interviews
router.get("/", interviewController.getAllInterviews);

// Add new interview
router.post("/add", interviewController.addNewInterview);

// Add new interview
router.get("/add", interviewController.getAddNewInterview);

// Edit interview route
router.get("/edit/:id", interviewController.getEditInterview);
router.post("/edit/:id", interviewController.postEditInterview);

// View applicants for a specific interview
router.get("/:id/applicants", interviewController.getInterviewApplicants);

// Update student status for a specific interview
router.post(
  "/:id/applicants/update",
  interviewController.postUpdateStudentStatus
);

module.exports = router;
