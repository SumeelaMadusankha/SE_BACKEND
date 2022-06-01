


const express = require('express'),
  router = express.Router();
  const authController = require('../controllers/authController');
  // const auth=require("../middlewares/auth");
  // const admin=require("../middlewares/admin");
  const payment = require('../middlewares/monthlyFee')
  const accept = require('../middlewares/adminAccepted')
router.post('/signin',accept,authController.signin );



module.exports = router; 
