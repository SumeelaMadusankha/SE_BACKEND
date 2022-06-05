const user = require('../services/userService');
const {validateUser, UserModel} = require("../models/userModel")
const {jwtPrivateKey} = require('../configs/config');
const jwt = require('jsonwebtoken');
const {userModel} = require("../models")


async function register(req, res, next) {
  const { error,value } = userModel.validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  
  let usr = await UserModel.findOne({ where: { username: req.body.username } });
  if (usr) return res.status(400).send(usr);
  try {
   let  u = await user.register(req,res);
    const token = jwt.sign({ _id: u._id, role: u.role },jwtPrivateKey);
    res.header('x-auth-token', token).send(u);
     
    } catch (err) {
      console.error(`Error while creating user account`, err.message);
      next(err);
    }
  }



async function getUsers(req,res,next){
  
  const userList = await user.fetchUsers();
  
  if(userList === null){
    res.send("NO Records");
  }else{
    res.send(userList);
  }
  
  next();
}

module.exports = {
    
  register,
  getUsers
  
};