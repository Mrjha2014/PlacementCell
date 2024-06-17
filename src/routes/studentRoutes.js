const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Get List of students
router.get("/", studentController.getAllStudents);

// Add new student
router.post("/add", studentController.addNewStudent);

//Get Add new student
router.get("/add", (req, res) => {
  res.render("addStudent");
});

module.exports = router;
