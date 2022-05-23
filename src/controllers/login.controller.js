require('dotenv').config()
const {loginModel} = require("../models");
const jwt = require('jsonwebtoken');


async function testRun(req,res,next){
         const user = {
          id: 199832,
          password : 'Nuwanj ay'
        }
        
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
        res.header('x-auth-tokne',accessToken).send(user);
        next();

}

module.exports = {testRun}