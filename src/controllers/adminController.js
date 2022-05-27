const admin = require('../services/adminService');
const { UserModel,validateUser} = require("../models/userModel");
const {jwtPrivateKey} = require('../configs/config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

async function addAdmin(req, res, next) {
  const { error,value } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  
  let usr = await UserModel.findOne({ where: { username: req.body.username } });
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
  module.exports = {
    
    addAdmin
    
  };