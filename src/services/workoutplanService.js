const {workoutplanModel} =require("../models/workoutPlanModel");

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

 async function fetchAllWorkoutPlans (req,res){
       
    const plans = await WorkoutPlanModel.workoutplanModel.findAll();
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
module.exports = {addWorkoutPlan,fetchWorkoutPlan,fetchAllWorkoutPlans,fetchSpecificWorkPlan};