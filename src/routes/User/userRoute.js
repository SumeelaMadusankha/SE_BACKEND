const auth = require('../../middlewares/auth.middleware');
const express = require('express'),
  router = express.Router();
  const {userController} = require('../../controllers/');
// get user lists
router.get('/list',auth.authenticateToken, userController.getUsers);

// create new user
router.post('/new',userController.register);

module.exports = router;
