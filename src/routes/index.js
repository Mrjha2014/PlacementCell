const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middleware/auth"); // Import your ensureAuthenticated middleware

// Importing route modules
const authRoutes = require("./authRoutes");
const studentRoutes = require("./studentRoutes");
const interviewRoutes = require("./interviewRoutes");
const jobRoutes = require("./jobRoutes");
const csvRoutes = require("./csvRoutes");

// Unprotected Routes (do not require authentication)
router.use(authRoutes); // These routes do not need authentication

// Protected Routes (require authentication)
router.use("/students", ensureAuthenticated, studentRoutes); // Requires authentication for /students routes
router.use("/interviews", ensureAuthenticated, interviewRoutes); // Requires authentication for /interviews routes
router.use("/jobs", ensureAuthenticated, jobRoutes); // Requires authentication for /jobs routes
router.use("/csv", ensureAuthenticated, csvRoutes); // Requires authentication for /csv routes

module.exports = router;
