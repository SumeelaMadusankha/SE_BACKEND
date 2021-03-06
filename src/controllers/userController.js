const user = require('../services/userService');
const {validateUser,validateUpdateUser, UserModel} = require("../models/userModel");
const {jwtPrivateKey} = require('../configs/config');
const jwt = require('jsonwebtoken');

const _ = require('lodash');



// const circularJSON = require('circular-json');
async function register(req, res, next) {
  //  res.status(400).send(req.body)
  const { error,value } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  
  let usr = await UserModel.findOne({ where: { username: req.body.username } });
  if (usr) return res.status(400).send("Username has already been taken ");
  try {
   let  u = await user.register(req,res);
   
    // res.header('x-auth-token', token).send(u);
    res.send(u)
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
    var decoded = jwt.verify(token, jwtPrivateKey);
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
    const details = await UserModel.findOne({ where: { username: decoded['username'] } });
   
    if(details === null){
      return res.send("NO Such user in the system");
    }else{
      res.send(_.pick(details, ['username','Name','email','mobileNo','gender','birthday','address']));
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
    res.send(_.pick(u, ['Name','email','mobileNo','gender','birthday','address']));
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
  
}