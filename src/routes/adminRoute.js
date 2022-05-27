


const express = require('express'),
router = express.Router();
const authController = require('../controllers/adminController');

router.post('/addAdmin',authController.addAdmin );



module.exports = router; 
