const mealPlan = require('../../services/mealPlanService');
const {mealModel} = require("../../models");
const { add } = require('nodemon/lib/rules');

async function addMealPlan(req, res, next) {

  
    const { error,value } = mealModel.validateMealPlan(req.body);
    
    if (error) return res.status(400).send(error.details[0].message); 
      try {
        res.json(await mealPlan.addMealPlan(req,res));
      } catch (err) {
        console.error(`Error while creating programming language`, err.message);
        next(err);
      }
    }


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

module.exports = {addMealPlan,
                  getMealPlanById,
                  getAllMealPlans};