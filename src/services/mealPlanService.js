const {mealModel} =require("../models");

async function addMealPlan(req, res) {
    const  mealType= req.body.mealType,
           note= req.body.note,
           weight= req.body.weight,
           height= req.body.height;

    const result = await mealModel.MealModel.create({note:note,mealType:mealType,weight:weight,height:height});
    return result;
   
}

async function fetchMealPlan (userId){
       
    const plan = await mealModel.MealModel.findByPk(userId);
    
      if (plan === null) {
      return null;
      } else {
      
      return plan;       
    }
 }


 async function fetchAllMealPlans (req,res){
       
    const plans = await mealModel.MealModel.findAll();
    //   const users = await UserModel.findAll();
      if (plans === null) {
      return null;
      } else {
      
      return plans;       }
 }

module.exports = {addMealPlan,fetchMealPlan,fetchAllMealPlans};