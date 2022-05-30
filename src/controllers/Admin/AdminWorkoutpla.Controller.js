const workoutPlan = require('../../services/workoutPlanService');
const {WorkoutPlanModel} = require("../../models");
const { add } = require('nodemon/lib/rules');

    async function getWorkoutPlanById(req,res,next){
      const userId = req.params.id;
      const plan = await workoutPlan.fetchWorkoutPlan(userId);
      
      if(plan === null){
        res.send("NO Records with userId: "+userId);
      }else{
        res.send(plan);
      }
      
      next();
    }

    async function getAllWorkoutPlans(req,res,next){
      
        const Plans = await workoutPlan.fetchAllWorkoutPlans();
        
        if(Plans === null){
          res.send("NO Workout Plan Records");
        }else{
          res.send(Plans);
        }
        
        next();
      }

module.exports = {
    getWorkoutPlanById,
    getAllWorkoutPlans};