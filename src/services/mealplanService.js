const {MealModel} =require("../models/mealPlanModel");
const { QueryTypes } = require('sequelize');
const  sequelize = require("../configs/database");
async function addMealPlan(req, res) {
  
    const  target_time= req.body.target_time,
           note= req.body.note,
           current_weight= req.body.current_weight,
           target_weight= req.body.target_weight,
           veg_prefer=req.body.veg_prefer;

    const result = await MealModel.create({note:note,veg_prefer:veg_prefer,current_weight:current_weight,target_weight:target_weight,target_time,target_time,username:req.username,req_date:new Date()});
    return result;
   
}

async function fetchMealPlan (userId){
       
    const plan = await MealModel.findByPk(userId);
    
      if (plan === null) {
      return null;
      } else {
      
      return plan;       
    }
 }


 async function fetchAllMealPlans (req,res){
  const plans= await sequelize.query(
    "SELECT id,Name,note,mealPlan,current_weight,target_weight,veg_prefer,target_time,req_date,email,mobileNo,mealplan.status FROM mealplan left outer join user on mealplan.username=user.username",
    {
    
      type: QueryTypes.SELECT
    }
  );
    // const plans = await MealModel.findAll();
    //   const users = await UserModel.findAll();
      if (plans === null) {
      return null;
      } else {
      
      return plans;       }
 }

 async function fetchSpecificMealPlan (req,res){
       
  const plans = await MealModel.findAll({where:{username:req.username}});
  //   const users = await UserModel.findAll();
    if (plans === null) {
    return null;
    } else {
    
    return plans;       }
}
module.exports = {addMealPlan,fetchMealPlan,fetchAllMealPlans,fetchSpecificMealPlan};