const express = require('express'),

router = express.Router();
const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");
  const workoutPlanController = require('../controllers/workoutController');
  router.post('/plan',auth,workoutPlanController.addWorkoutPlan);
  router.get('/plan/:id',auth,workoutPlanController.getWorkoutPlanById);


  module.exports = router;