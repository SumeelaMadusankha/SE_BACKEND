
const { isEmpty } = require('lodash');
const usermodel = require('../services/userService')
const {AuthModel} = require('../models/authModel')
module.exports = async function (req, res, next) {
    let user = await AuthModel.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(400).send('Invalid username or password.');
        const accept = await usermodel.checkAdminAccept(req,res);
        
        if (isEmpty(accept)) {
            return  res.status(595).send("Admin has not been aproved you yet");
        }
        
   
    next()
  }