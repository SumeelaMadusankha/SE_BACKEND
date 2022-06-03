const express = require('express'),

router = express.Router();

const uploadmealplanController = require('../controllers/admin_uploadMealplanController');

router.post('/addMP',uploadmealplanController.uploadMP);

module.exports = router;