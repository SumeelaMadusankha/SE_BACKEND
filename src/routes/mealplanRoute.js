const express = require('express'),

router = express.Router();
const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");
  const mealPlanControllerUser = require('../controllers/mealController');
  router.post('/plan',auth,mealPlanControllerUser.addMealPlan);
  router.get('/plan/:id',auth,mealPlanControllerUser.getMealPlanById);


  module.exports = router;