const express = require('express'),

router = express.Router();
const {mealPlanControllerAdmin} = require('../../controllers');

router.get('/plans',mealPlanControllerAdmin.getAllMealPlans);
router.get('/plan/:id',mealPlanControllerAdmin.getMealPlanById);

module.exports = router;