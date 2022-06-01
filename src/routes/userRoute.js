const express = require('express'),
  router = express.Router();
  const userController = require('../controllers/userController');

  const auth=require("../middlewares/auth");
  const admin=require("../middlewares/admin");
  const payment=require("../middlewares/monthlyFee");
  const accept=require("../middlewares/adminAccepted");
// create new user
router.post('/register',userController.register);
//get profile details
router.get('/me',auth,userController.getProfileDetails);

//update user profile
router.put('/update',auth,userController.updateProfileDetails);



module.exports = router;