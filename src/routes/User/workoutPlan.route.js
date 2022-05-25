const express = require('express'),

router = express.Router();

  const {workoutPlanController} = require('../../controllers');
  router.post('/plan',workoutPlanController.addWorkoutPlan);
  router.get('/plan/:id',workoutPlanController.getWorkoutPlanById);
  router.get('/plans',workoutPlanController.getAllWorkoutPlans);

  module.exports = router;