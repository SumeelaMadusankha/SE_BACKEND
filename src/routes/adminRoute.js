

const express = require('express'),
router = express.Router();
const adminController = require('../controllers/adminController');
const mealplancontroller = require('../controllers/admin_mealplanController')
const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");
const workoutcontroller = require('../controllers/workoutController')

//accept user registration request
router.get('/accept/:username',auth,admin, adminController.acceptRegistration);
//declined user registration request
router.get('/decline/:username',auth,admin, adminController.declineRegistration);
//declined user registration request
router.get('/remove/:username',auth,admin, adminController.declineAdmin);
// get user lists
router.get('/userslist',auth,admin, adminController.getUsers);

// get admin lists
router.get('/adminslist',auth,admin, adminController.getAdmins);
router.get('/mealplanlist',auth,admin, mealplancontroller.getAllMealPlans);
router.get('/workoutList',auth,admin, workoutcontroller.getAllWorkoutPlans);
//add admin
router.post('/addAdmin',auth,admin,adminController.addAdmin );

router.get('/pendingUserList',auth,admin, adminController.getPendingUserList);

//admin dashboard routes
router.get('/pendingRegistrationsCount',auth,admin, adminController.getPendingRegistrations);
router.get('/me',auth,admin, adminController.getAdminDetatils);
router.get('/pendingPaymentsCount',auth,admin, adminController.getPendingPaymentsCount);
router.get('/acceptedgPaymentsCount',auth,admin, adminController.getAcceptedPaymentsCount);

router.get('/pendingWorkOutPlanRequestCount',auth,admin, adminController.getPendingWorkOutRequestCount);
router.get('/pendingMealPlanRequestCount',auth,admin, adminController.getPendingMealPlanRequestCount);
router.get('/acceptedRegistrationsCount',auth,admin, adminController.getAcceptedRegistrtions);
router.get('/acceptedAdminsCount',auth,admin, adminController.getAddminCount);
router.get('/uploadedMealPlanCount',auth,admin, adminController.getUploadedMealPlanCount);
router.get('/uploadedWorkOutPlanCount',auth,admin, adminController.getUploadedWorkoutRequestCount);
module.exports = router; 
