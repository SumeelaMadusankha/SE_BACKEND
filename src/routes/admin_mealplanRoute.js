const express = require('express'),

router = express.Router();
const mealPlanControllerAdmin = require('../controllers/admin_mealplanController');

router.get('/plans',mealPlanControllerAdmin.getAllMealPlans);
router.get('/plan/:id',mealPlanControllerAdmin.getMealPlanById);

module.exports = router;