
const req = require('express/lib/request');

const  sequelize = require("../configs/database");
const { PaymentModel } = require("../models/paymentModel");
const path =  require('path');
const { QueryTypes } = require('sequelize');
const util = require('util');
async function payMonthlyFee(req,res){
    const month = req.body.month,
          description = req.body.description,
          username=req.username,
          file =req.files.slip;
          year =  new Date().getFullYear();
          try{
            var fileName = file.name;
            
            var size = file.data.length;
            
            var extension = path.extname(fileName);
            
            var allowedExtensions=/png|pdf|jpeg|jpg|gif/;
            
            
            if (!allowedExtensions.test(extension)) throw("Unsurpoted extension!");
            var md5 = file.md5;
            var URL ="/uploads/"+md5+extension;
         
             await util.promisify(file.mv)("./public"+URL);

            }catch(err){
              return  res.status(400).send(extension+"not allowed")
            }
            const payment = await PaymentModel.create({username:username,month:month,slipPath:URL,description:description,year:year});
             return payment;

        
}
async function getPaymentList(){
    const month = new Date().toLocaleString(
      'default', {month: 'long'}
    );
    const year =  new Date().getFullYear().toString();
    const paymentList= await sequelize.query(
      "SELECT Name,email,mobileNo,slipPath,description,month,id FROM monthlypayment left outer join user on monthlypayment.username=user.username  where month= :month and year=:year and paymentStatus=:paymentStatus",
      {
       replacements:{paymentStatus: 'pending',
                     month:month,
                     year:year},
        type: QueryTypes.SELECT
      }
    );
  
  if (paymentList === null) {
  return null;
  } else {
  
  return paymentList;       }
  }

  async function acceptPayment(req,res){
   
    const payment = await PaymentModel.update({paymentStatus:'success'},
    {where:{
      id: req.id
    }});
  
    return payment;
  }
  async function declinePayment(req,res){
   
    const payment = await PaymentModel.update({paymentStatus:'declined'},
    {where:{
      id: req.id
    }});
  
    return payment;
  }
  async function checkMonthlyFeePaid(req,res){
    const user = await PaymentModel.findAll(
    {where:{
      username: req.user.username,
      month:new Date().toLocaleString(
        'default', {month: 'long'}
      ),
      year:new Date().getFullYear().toString(),
      paymentStatus:'success'

    }});
    
  
    return user;
  
  }
  async function fetchPaymentsSpecificToUser (req,res){
       
    const payments = await PaymentModel.findAll({where:{username:req.username}});
    //   const users = await UserModel.findAll();
      if (payments === null) {
      return null;
      } else {
      
      return payments;       }
  }
module.exports={
    payMonthlyFee,
    getPaymentList,
    acceptPayment,
    checkMonthlyFeePaid,
    declinePayment,fetchPaymentsSpecificToUser
}