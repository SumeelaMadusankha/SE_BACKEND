const uploadMealPlan = require("../../services/uploadMealPlanService");
const {jwtPrivateKey} = require('../../configs/config');
const jwt = require('jsonwebtoken');
const { func } = require("joi");

async function uploadMP(req,res,next){
    const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  const pay = await uploadMealPlan.uploadmealplan(req,res);
  res.send(pay);

}

module.exports={
    uploadMP
}