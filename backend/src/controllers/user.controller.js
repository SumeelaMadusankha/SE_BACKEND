const user = require('../services/user.service');



async function register(req, res, next) {
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