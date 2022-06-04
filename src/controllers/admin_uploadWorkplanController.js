const uploadWorkoutplan = require("../services/admin_uploadWorlplanService");
const {jwtPrivateKey} = require('../configs/config');
const jwt = require('jsonwebtoken');
const { func } = require("joi");

async function uploadWoP(req,res,next){
    const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  const pay = await uploadWorkoutplan.uploadworkoutplan(req,res);
  res.send(pay);

}

module.exports={
    uploadWoP
}