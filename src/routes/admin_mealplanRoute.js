const express = require('express'),

router = express.Router();
const mealPlanControllerAdmin = require('../controllers/admin_mealplanController');
const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");
router.get('/plans',auth,admin,mealPlanControllerAdmin.getAllMealPlans);
router.get('/plan/:id',auth,admin,mealPlanControllerAdmin.getMealPlanById);

module.exports = router;