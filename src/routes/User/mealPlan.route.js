const express = require('express'),

router = express.Router();

  const {mealPlanControllerUser} = require('../../controllers');
  router.post('/plan',mealPlanControllerUser.addMealPlan);
  router.get('/plan/:id',mealPlanControllerUser.getMealPlanById);


  module.exports = router;