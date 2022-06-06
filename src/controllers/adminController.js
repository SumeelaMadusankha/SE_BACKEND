const admin = require('../services/adminService');
const {AdminModel,validateAdmin} = require("../models/adminModel");
const {AuthModel}=require('../models/authModel');
const {PaymentModel}=require('../models/paymentModel');
const {jwtPrivateKey} = require('../configs/config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// const calculateAge = (birthday) => {
//   const ageDifMs = Date.now() - new Date(birthday).getTime();
//   const ageDate = new Date(ageDifMs);
//   return Math.abs(ageDate.getUTCFullYear() - 1970);
// }


async function addAdmin(req, res, next) {
  
  const { error,value } = validateAdmin(req.body);

  if (error) return res.status(400).send(error.details[0].message); 
 
  let usr = await AuthModel.findOne({ where: { username: req.body.username } });
 
  if (usr) return res.status(400).send("This username has already been taken");
  
  try {
   
   let  u = await admin.addAdmin(req,res);
   
   res.send(u);
    next();
     
    } catch (err) {
      console.error(`Error while creating addmin account`, err.message);
      next(err);
    }
  }

  async function getUsers(req,res,next){
  
    const userList = await admin.fetchUsers();
    
    if(userList === null){
      res.send("NO Records");
    }else{
      
     
      res.send(userList);
    }
    
    next();
  }
  
  async function getPendingUserList(req,res,next){
  
    const userList = await admin.fetchPendingUsersList();
    
    if(userList === null){
      res.send("NO Records");
    }else{
      
     
      res.send(userList);
    }
    
    next();
  }
  async function getAdmins(req,res,next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
  
    try {
      var decoded = jwt.verify(token, jwtPrivateKey);
     
      
     
     
    }
    catch (ex) {
      res.status(400).send('Invalid token.');
    }
    const adminList = await admin.fetchAdmins(decoded['username']);
    
    if(adminList === null){
      res.send("NO Records");
    }else{
      res.send(adminList);
    }
    
    
    next();
  }

  async function getPendingRegistrations(req,res,next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
  
    try {
      var decoded = jwt.verify(token, jwtPrivateKey);
     
      
     
     
    }
    catch (ex) {
      res.status(400).send('Invalid token.');
    }
    const list = await admin.pendingUserCount(req);
    
    if(list === null){
      res.send("NO Records");
    }else{
      res.send(list);
    }
    
    
    next();
  }

  async function acceptRegistration(req,res,next){
    
      
      req.username=req.params.username;
      // return res.send(req.username)
      const user = await admin.acceptReg(req,res);
      res.send(user);
     
    
  }
  async function declineRegistration(req,res,next){
    
      
    req.username=req.params.username;
    // return res.send(req.username)
    const user = await admin.declineReg(req,res);
    res.send(user);
   
  
}
async function declineAdmin(req,res,next){
    
      
  req.username=req.params.username;
  const user = await admin.declineAdmin(req,res);
  res.send(user);
 

}
async function getAcceptedRegistrtions(req,res,next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
   
    
   
   
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
  const list = await admin.acceptedUserCount(req);
  
  if(list === null){
    res.send("NO Records");
  }else{
    res.send(list);
  }
  
  
  next();
}
async function getAddminCount(req,res,next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
   
    
   
   
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
  const list = await admin.acceptedAdminCount(req);
  
  if(list === null){
    res.send("NO Records");
  }else{
    res.send(list);
  }
  
  
  next();
}

async function getPendingPaymentsCount(req,res,next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
   
    
   
   
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
  const list = await admin.pendingPayments(req);
  
  if(list === null){
    res.send("NO Records");
  }else{
    res.send(list);
  }
  
  
  next();
}
async function getAcceptedPaymentsCount(req,res,next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
   
    
   
   
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
  const list = await admin.acceptedPayments(req);
  
  if(list === null){
    res.send("NO Records");
  }else{
    res.send(list);
  }
  
  
  next();
}
async function getPendingWorkOutRequestCount(req,res,next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
   
    
   
   
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
  const list = await admin.pendingWorkOutPlanRequest(req);
  
  if(list === null){
    res.send("NO Records");
  }else{
    res.send(list);
  }
  
  
  next();
}
async function getPendingMealPlanRequestCount(req,res,next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
   
    
   
   
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
  const list = await admin.pendingMealPlanRequest(req);
  
  if(list === null){
    res.send("NO Records");
  }else{
    res.send(list);
  }
  
  
  next();
}
async function getUploadedMealPlanCount(req,res,next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
   
    
   
   
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
  const list = await admin.uploadedmealPlanRequest(req);
  
  if(list === null){
    res.send("NO Records");
  }else{
    res.send(list);
  }
  
  
  next();
}
async function getUploadedWorkoutRequestCount(req,res,next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
   
    
   
   
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
  const list = await admin.uploadedWorkOutPlanRequest(req);
  
  if(list === null){
    res.send("NO Records");
  }else{
    res.send(list);
  }
  
  
  next();
}

async function getAdminDetatils(req,res,next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, jwtPrivateKey);
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
    const details = await AdminModel.findOne({ where: { username: decoded['username'] } });
   
    if(details === null){
      return res.send("NO Such user in the system");
    }else{
      res.send(_.pick(details, ['Name','email','mobileNo','gender','birthday','address']));
    }
   
  
  
  next();
}
  module.exports = {
   
    addAdmin,
    getAdminDetatils,
    getUsers,
    getAdmins,
    acceptRegistration,
    declineRegistration,
    declineAdmin,
    getPendingUserList,getPendingRegistrations,getAcceptedRegistrtions,getAddminCount,getPendingPaymentsCount,getAcceptedPaymentsCount,
    getPendingWorkOutRequestCount,getPendingMealPlanRequestCount,getUploadedMealPlanCount,getUploadedWorkoutRequestCount

    
  };