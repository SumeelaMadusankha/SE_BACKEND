
const {UserModel} =require("../models/userModel");
const {AdminModel} =require("../models/adminModel");
const {AuthModel,hashPassword}= require("../models/authModel")
const  sequelize = require("../configs/database")
const { QueryTypes } = require('sequelize');
const path =  require('path');
const util = require('util');
const { json } = require("body-parser");
const { isEmpty } = require("lodash");
async function register(req, res) {
const circularJSON = require('circular-json');
    
    const  Name = req.body.Name,
           email= req.body.email,
           mobileNo=req.body.mobileNo,
           gender= req.body.gender,
           birthday= req.body.birthday,
           address= req.body.address,
           username=req.body.username,
           password=hashPassword(req.body.password),
           registrationFee='notPaid';
           role='User';
           


           try{
           
            
            var file = req.files.registerFeeSlip;
            var fileName = file.name;
            
            var size = file.data.length;
           
            var extension = path.extname(fileName);
           
            var allowedExtensions=/png|pdf|jpeg|jpg|gif/;
            
            if (!allowedExtensions.test(extension)) throw("Unsurpoted extension!");
            var md5 = file.md5;
            var URL ="/uploads/"+md5+extension;
             var s ="dbdbdb";
             await util.promisify(file.mv)("./public"+URL);
             
            }catch(err){
             return  res.status(400).send(extension+"not allowed")
            }

           const t = await sequelize.transaction();

           try {
         
             const user = await UserModel.create({Name:Name,email:email,mobileNo:mobileNo,gender:gender,birthday:birthday,address:address,username:username,registrationFee:registrationFee,registerFeeSlip:URL}, { transaction: t });
         
             const auth =await AuthModel.create({
               username:username,
               password:password,
               role: role
             }, { transaction: t });
           
             
             await t.commit();



             return user;
           } catch (error) {
           
            
             await t.rollback();
             return  res.status(400).json({
              message:error
            })
           
           }
           

   
   
  } 


  
async function updateUserProfile(req,res){
     const  firstName = req.body.firstName,
           lastName = req.body.lastName,
           email= req.body.email,
           mobileNo=req.body.mobileNo,
           gender= req.body.gender,
           birthday= req.body.birthday,
           address= req.body.address,
           username=req.username;

          try{
          
            const result = await UserModel.update({firstName:firstName,lastName:lastName,email:email,mobileNo:mobileNo,gender:gender,birthday:birthday,address:address},{
              where: {
                username: username
              }
            });

            
   
            const details = await UserModel.findOne({ where: { username: username } });
           
            if(details === null){
              res.send("NO Such user in the system");
            }else{
             return details;
            }
           
          }catch(error){
            res.status(400).send('Invalid token.');
          }
          
          
      
           
           
}

async function checkAdminAccept(req,res){
  const user1 = await AdminModel.findAll(
    {where:{
      username: req.body.username,
      status: 'accepted'
     
    }});
    if (isEmpty(user1)) {
      const user2 = await UserModel.findAll(
        {where:{
          username: req.body.username,
          status: 'accepted'
         
        }});
        if (isEmpty(user2)) {
           return null;
        }
        return user2;
    }
  
    return user1;
}

  module.exports = {
   register,
   checkAdminAccept,
   updateUserProfile
  }