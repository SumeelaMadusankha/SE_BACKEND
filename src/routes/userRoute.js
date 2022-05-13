const express = require('express'),
  router = express.Router();
  const userController = require('../controllers/userController');
// get user lists
router.get('/list', userController.getUsers);

// create new user
router.post('/new',userController.register);

module.exports = router;