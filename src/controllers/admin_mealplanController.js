const mealPlan = require('../services/mealplanService');
const {mealModel} = require("../models/mealPlanModel");
const { add } = require('nodemon/lib/rules');


    async function getMealPlanById(req,res,next){
      const userId = req.params.id;
      const mealPaln = await mealPlan.fetchMealPlan(userId);
      
      if(mealPaln === null){
        res.send("NO Records with userId: "+userId);
      }else{
        res.send(mealPaln);
      }
      
      next();
    }

    async function getAllMealPlans(req,res,next){
      
      const mealPlans = await mealPlan.fetchAllMealPlans();
      
      if(mealPlans === null){
        res.send("NO Meal Plan Records");
      }else{
        res.send(mealPlans);
      }
      
      next();
    }

module.exports = {getMealPlanById,
                  getAllMealPlans};