const {workoutplanModel} =require("../models/workoutPlanModel");
const { QueryTypes } = require('sequelize');
const  sequelize = require("../configs/database");
async function addWorkoutPlan(req, res) {
    const  
           note= req.body.note,
           current_weight= req.body.current_weight,
           target_weight= req.body.target_weight,
           target_time= req.body.target_time,
           targets=req.body.targets,
           workout_frequency=req.body.workout_frequency;
           

    const result = await workoutplanModel.create({note:note,current_weight:current_weight,target_weight:target_weight,targets:targets,target_time:target_time,workout_frequency:workout_frequency,date: new Date(),username:req.username});
    return result;
   
}

async function fetchWorkoutPlan (userId){
       
    const workoutPlan = await workoutplanModel.findByPk(userId);
    
      if (workoutPlan === null) {
      return null;
      } else {
      
      return workoutPlan;       
    }
 }

 async function fetchAllworkPlans (req,res){
       
  const plans= await sequelize.query(
    "SELECT id,Name,note,workoutPlan,current_weight,target_weight,workout_frequency,target_time,date,email,mobileNo,workoutplan.status,targets,gender FROM workoutplan left outer join user on workoutplan.username=user.username",
    {
    
      type: QueryTypes.SELECT
    }
  );
    //   const users = await UserModel.findAll();
      if (plans === null) {
      return null;
      } else {
      
      return plans;       }
 }
 async function fetchSpecificWorkPlan (req,res){
       
  const plans = await workoutplanModel.findAll({where:{username:req.username}});
  //   const users = await UserModel.findAll();
    if (plans === null) {
    return null;
    } else {
    
    return plans;       }
}
module.exports = {addWorkoutPlan,fetchWorkoutPlan,fetchSpecificWorkPlan,fetchAllworkPlans};