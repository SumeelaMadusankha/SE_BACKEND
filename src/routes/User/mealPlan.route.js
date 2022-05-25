const express = require('express'),

router = express.Router();

  const {mealPlanController} = require('../../controllers');
  router.post('/plan',mealPlanController.addMealPlan);
  router.get('/plan/:id',mealPlanController.getMealPlanById);
  router.get('/plans',mealPlanController.getAllMealPlans);

  module.exports = router;