const Joi = require('joi');

const {UserModel, verifyPassword} = require('../models/userModel');
const _ = require('lodash');

const {jwtPrivateKey} =require('../configs/config')
const jwt = require('jsonwebtoken');
async function signin(req, res) {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await UserModel.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(400).send('Invalid username or password.');
  
    const validPassword = verifyPassword(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid username or password.');
    const token = jwt.sign({ username:user.username, role: user.role },jwtPrivateKey);
    
    res.send(token);
  }
  function validate(req) {
    const schema = Joi.object({
        
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
       
      });
    
      return schema.validate(req)
  }
  module.exports = {
    
    signin,
    validate
    
  };