const admin = require('../services/adminService');
const {AdminModel,validateAdmin} = require("../models/adminModel");
const {AuthModel}=require('../models/authModel');
const {PaymentModel}=require('../models/paymentModel');
const {jwtPrivateKey} = require('../configs/config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

async function addAdmin(req, res, next) {
  const { error,value } = validateAdmin(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  
  let usr = await AuthModel.findOne({ where: { username: req.body.username } });
  if (usr) return res.status(400).send(usr);
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
  async function getAdmins(req,res,next){
  
    const adminList = await admin.fetchAdmins();
    
    if(adminList === null){
      res.send("NO Records");
    }else{
      res.send(adminList);
    }
    
    next();
  }
  async function acceptRegistration(req,res,next){
    
      
      req.username=req.params.username;
      const user = await admin.acceptReg(req,res);
      res.send(user);
     
    
  }
  async function declineRegistration(req,res,next){
    
      
    req.username=req.params.username;
    const user = await admin.declineReg(req,res);
    res.send(user);
   
  
}
async function declineAdmin(req,res,next){
    
      
  req.username=req.params.username;
  const user = await admin.declineAdmin(req,res);
  res.send(user);
 

}

  module.exports = {
   
    addAdmin,
    getUsers,
    getAdmins,
    acceptRegistration,
    declineRegistration,
    declineAdmin

    
  };