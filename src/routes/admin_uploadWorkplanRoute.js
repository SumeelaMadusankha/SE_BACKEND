const express = require('express'),

router = express.Router();

const uploadWorkoutplanController = require('../controllers/admin_uploadWorkplanController');

router.post('/addWoP',uploadWorkoutplanController.uploadWoP);

module.exports = router;