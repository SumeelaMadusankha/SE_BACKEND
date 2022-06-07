const express = require('express'),

router = express.Router();
const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");
const payment = require("../middlewares/monthlyFee")
  const workoutPlanController = require('../controllers/workoutController');
  router.post('/plan',auth,payment,workoutPlanController.addWorkoutPlan);
  router.get('/plan/:id',auth,payment,workoutPlanController.getWorkoutPlanById);


  module.exports = router;