

const express = require('express'),
router = express.Router();
const adminController = require('../controllers/adminController');

const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");


// get user lists
router.get('/userslist',auth,admin, adminController.getUsers);

// get admin lists
router.get('/adminslist',auth,admin, adminController.getAdmins);

//add admin
router.post('/addAdmin',auth,admin,adminController.addAdmin );

//accept user registration request
router.get('/:id',auth,admin, adminController.getAdmins);

module.exports = router; 
