const user = require('../../services/userService');
const {UserModel} = require("../../models")


async function register(req, res, next) {
  const { error,value } = UserModel.validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
    try {
      res.json(await user.register(req,res));
    } catch (err) {
      console.error(`Error while creating programming language`, err.message);
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