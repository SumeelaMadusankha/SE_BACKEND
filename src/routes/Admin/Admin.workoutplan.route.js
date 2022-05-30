const express = require('express'),

router = express.Router();

  const {workoutPlanControllerAdmin} = require('../../controllers');
  router.get('/plan/:id',workoutPlanControllerAdmin.getWorkoutPlanById);
  router.get('/plans',workoutPlanControllerAdmin.getAllWorkoutPlans);

  module.exports = router;