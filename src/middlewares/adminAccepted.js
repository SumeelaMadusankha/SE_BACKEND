
const { isEmpty } = require('lodash');
const usermodel = require('../services/userService')
module.exports = async function (req, res, next) {
   
        const accept = await usermodel.checkAdminAccept(req,res);
        
        if (isEmpty(accept)) {
            return  res.status(595).send("Admin has not been aproved you yet");
        }
        
   
    next()
  }