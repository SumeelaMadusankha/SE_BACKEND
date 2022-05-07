const user = require('../services/userService');
const {validateUser} = require("../models/userModel")


async function register(req, res, next) {
  const { error,value } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
    try {
      res.json(await user.register(req,res));
    } catch (err) {
      console.error(`Error while creating programming language`, err.message);
      next(err);
    }
  }

  module.exports = {
    
    register,
    
  };