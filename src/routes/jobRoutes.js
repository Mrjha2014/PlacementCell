const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Fetch external job listings
router.get('/', jobController.getExternalJobs);

module.exports = router;
