const mealPlan = require('../services/mealplanService');
const mealModel = require("../models/mealPlanModel");
const { add } = require('nodemon/lib/rules');
const {jwtPrivateKey} = require('../configs/config');
const jwt = require('jsonwebtoken');
async function addMealPlan(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
 
    req.username=decoded['username'] 
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
  
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
    async function getSpecificMealPlans(req,res,next){
      const token = req.header('x-auth-token');
      if (!token) return res.status(401).send('Access denied. No token provided.');
    
      try {
        var decoded = jwt.verify(token, jwtPrivateKey);
     
        req.username=decoded['username'] 
      }
      catch (ex) {
        res.status(400).send('Invalid token.');
      }
      const mealPaln = await mealPlan.fetchSpecificMealPlan(req,res);
      
      if(mealPaln === null){
        res.send("NO Records with userId: "+userId);
      }else{
        res.send(mealPaln);
      }
      
      next();
    }

module.exports = {addMealPlan,
                  getMealPlanById,
                  getSpecificMealPlans
                  };