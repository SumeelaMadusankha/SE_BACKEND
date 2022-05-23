const express = require('express'),
  router = express.Router();

  const {loginController} = require('../../controllers');


  router.get('/current:id',loginController.testRun);
  router.post('/plan',loginController.testRun);

  module.exports = router;