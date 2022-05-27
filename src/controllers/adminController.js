const admin = require('../services/adminService');
  async function fetchUsers (req,res){
       
       const users = await UserModel.findAll();
       if (users === null) {
       return null;
       } else {
       console.log(users);
       return users;       }
  }
const {AdminModel,validateAdmin} = require("../models/adminModel");
const {AuthModel}=require('../models/authModel');
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
  module.exports = {
    
    addAdmin,
    getUsers,
    getAdmins

    
  };