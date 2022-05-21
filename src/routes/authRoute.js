


const express = require('express'),
  router = express.Router();
  const authController = require('../controllers/authController');

router.post('/signin',authController.signin );

console.log("hello world");

module.exports = router; 
