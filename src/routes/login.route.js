const express = require('express'),
  router = express.Router();

  const {loginController} = require('../controllers/');


  router.post('/login',loginController.testRun);

  module.exports = router;