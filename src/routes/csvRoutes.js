const express = require('express');
const csvController = require('../controllers/csvController');
const router = express.Router();

// Route to download CSV
router.get('/download-csv', csvController.downloadCsv);

module.exports = router;
