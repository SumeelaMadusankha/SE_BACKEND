const express = require('express'),
  router = express.Router();
  const userController = require('../controllers/userController');
// get user lists
router.get('/list', function(req, res) {
  
});

// create new user
router.post('/new',userController.register);

module.exports = router;