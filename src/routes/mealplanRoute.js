const express = require('express'),

router = express.Router();
const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");
const payment = require("../middlewares/monthlyFee")
  const mealPlanControllerUser = require('../controllers/mealController');
  router.post('/plan',auth,payment,mealPlanControllerUser.addMealPlan);
  router.get('/plan/:id',auth,payment,mealPlanControllerUser.getMealPlanById);


  module.exports = router;