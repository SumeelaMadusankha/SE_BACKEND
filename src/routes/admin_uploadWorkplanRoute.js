const express = require('express'),

router = express.Router();

const uploadWorkoutplanController = require('../controllers/admin_uploadWorkplanController');
const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");
router.post('/addWoP',auth,admin,uploadWorkoutplanController.uploadWoP);

module.exports = router;