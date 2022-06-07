const payment = require("../services/paymentService");
const {jwtPrivateKey} = require('../configs/config');
const jwt = require('jsonwebtoken');
const { func } = require("joi");



async function monthlyPayment(req,res,next){
    const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.username= decoded['username'];
    
  }catch (ex) {
    res.status(400).send('Invalid token.');
  }
  const pay = await payment.payMonthlyFee(req,res);
  return res.send("pay");

}
async function getPaymentList(req,res,next){
    const paymentList = await payment.getPaymentList();
      
    if(paymentList === null){
      res.send("NO Records");
    }else{
     return  res.send(paymentList);
    }
    
    next();
  }
  async function acceptPayment(req,res,next){
      try{
        req.id=req.params.id;
        const p = await payment.acceptPayment(req,res);
        res.send(p);
    }catch(err){
        return res.send("payment acceptment process failed")
    }
  next()
  }
  async function declinePayment(req,res,next){
    try{
      req.id=req.params.id;
      const p = await payment.declinePayment(req,res);
      res.send(p);
  }catch(err){
      return res.send("payment decline process failed")
  }
next()
}
async function getPaymentListOfUser(req,res,next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.username= decoded['username'];
    
  }catch (ex) {
    res.status(400).send('Invalid token.');
  }
  const paymentList = await payment.fetchPaymentsSpecificToUser(req,res);
    
  if(paymentList === null){
    res.send("NO Records");
  }else{
   return  res.send(paymentList);
  }
  
  next();
}
module.exports={
    monthlyPayment,
    getPaymentList,
    acceptPayment,
    declinePayment,
    getPaymentListOfUser
}
