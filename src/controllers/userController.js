const user = require('../services/userService');
const {validateUser,validateUpdateUser, UserModel} = require("../models/userModel");
const {jwtPrivateKey} = require('../configs/config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

async function register(req, res, next) {
  const { error,value } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  
  let usr = await UserModel.findOne({ where: { username: req.body.username } });
  if (usr) return res.status(400).send(usr);
  try {
   let  u = await user.register(req,res);
    const token = jwt.sign({ username: u.username, role: u.role },jwtPrivateKey);
    res.header('x-auth-token', token).send(u);
    next();
     
    } catch (err) {
      console.error(`Error while creating user account`, err.message);
      next(err);
    }
  }





async function getProfileDetails(req,res,next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
   
    const details = await UserModel.findOne({ where: { username: decoded['username'] } });
   
    if(details === null){
      res.send("NO Such user in the system");
    }else{
      res.send(_.pick(details, ['firstName','lastName','email','mobileNo','gender','birthday','address']));
    }
   
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
  
  next();
}
async function updateProfileDetails(req,res,next){
  const { error,value } = validateUpdateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

   
  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.username=decoded['username'];
    let  u = await user.updateUserProfile(req,res);
    res.send(_.pick(u, ['firstName','lastName','email','mobileNo','gender','birthday','address']));
    next();
      
     } catch (err) {
       console.error(`Error while updating user account details`, err.message);
       next(err);
     }
}
module.exports = {
    
  register,
 
  getProfileDetails,
  updateProfileDetails
  
};