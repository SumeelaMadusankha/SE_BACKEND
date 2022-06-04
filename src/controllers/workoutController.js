const workoutPlan = require('../services/workoutplanService');
const {workoutplanModel,validateWorkOutPlan} = require("../models/workoutPlanModel");
const { add } = require('nodemon/lib/rules');
const {jwtPrivateKey} = require('../configs/config');
const jwt = require('jsonwebtoken');
async function addWorkoutPlan(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
 
    req.username=decoded['username'] 
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
  
  const { error,value } = validateWorkOutPlan(req.body);
    
     
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

    async function getSpecificWorkOutPlans(req,res,next){
      const token = req.header('x-auth-token');
      if (!token) return res.status(401).send('Access denied. No token provided.');
    
      try {
        var decoded = jwt.verify(token, jwtPrivateKey);
     
        req.username=decoded['username'] 
      }
      catch (ex) {
        res.status(400).send('Invalid token.');
      }
      const workPlan = await workoutPlan.fetchSpecificWorkPlan(req,res);
      
      if(workPlan === null){
        res.send("NO Records with userId: "+userId);
      }else{
        res.send(workPlan);
      }
      
      next();
    }

module.exports = {addWorkoutPlan,
    getWorkoutPlanById,getSpecificWorkOutPlans};