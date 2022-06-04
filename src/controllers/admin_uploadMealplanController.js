const uploadMealPlan = require("../services/admin_uploadMealplanService");
const {jwtPrivateKey} = require('../configs/config');
const jwt = require('jsonwebtoken');
const { func } = require("joi");

async function uploadMP(req,res,next){


  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.username= decoded['username'];
    
  }catch (ex) {
    res.status(400).send('Invalid token.');
  }
  const plan = await uploadMealPlan.uploadmealplan(req,res);
  res.send(plan);

}

module.exports={
    uploadMP
}