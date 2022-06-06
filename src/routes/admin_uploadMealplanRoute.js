const express = require('express'),

router = express.Router();

const uploadmealplanController = require('../controllers/admin_uploadMealplanController');
const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");


router.post('/addMP',auth,admin,uploadmealplanController.uploadMP);

module.exports = router;