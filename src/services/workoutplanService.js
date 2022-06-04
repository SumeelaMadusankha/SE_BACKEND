const {workoutplanModel} =require("../models/workoutPlanModel");

async function addWorkoutPlan(req, res) {
    const  targetPart= req.body.targetPart,
           note= req.body.note,
           Cur_Weight= req.body.Cur_Weight,
           Tar_Weight= req.body.Tar_Weight;
           Tar_days= req.body.Tar_days;
           PractiseDaysPerWeek= req.body.PractiseDaysPerWeek;

    const result = await workoutplanModel.create({note:note,targetPart:targetPart,Cur_Weight:Cur_Weight,Tar_Weight:Tar_Weight,Tar_days:Tar_days,PractiseDaysPerWeek:PractiseDaysPerWeek});
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

module.exports = {addWorkoutPlan,fetchWorkoutPlan,fetchAllWorkoutPlans};