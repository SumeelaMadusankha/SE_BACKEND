const workoutPlan = require('../../services/workoutPlanService');
const {WorkoutPlanModel} = require("../../models");
const { add } = require('nodemon/lib/rules');

async function addWorkoutPlan(req, res, next) {

  
    const { error,value } = WorkoutPlanModel.validateWorkOutPlan(req.body);
    
    if (error) return res.status(400).send(error.details[0].message); 
      try {
        res.json(await workoutPlan.addWorkoutPlan(req,res));
      } catch (err) {
        console.error(`Error while creating programming language`, err.message);
        next(err);
      }
    }


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

    

module.exports = {addWorkoutPlan,
    getWorkoutPlanById};