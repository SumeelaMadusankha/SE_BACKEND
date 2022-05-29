const {AdminModel} =require("../models/adminModel");
const {AuthModel,hashPassword} =require("../models/authModel");
const { QueryTypes } = require('sequelize');
const  sequelize = require("../configs/database");
const { UserModel } = require("../models/userModel");

async function addAdmin(req, res) {

    
    const  firstName = req.body.firstName,
           lastName = req.body.lastName,
           email= req.body.email,
           mobileNo=req.body.mobileNo,
           gender= req.body.gender,
           birthday= req.body.birthday,
           address= req.body.address,
           username=req.body.username,
           password=hashPassword(req.body.password),
           role='Admin';
           



           const t = await sequelize.transaction();

           try {
           
         
           
             const admin = await AdminModel.create({firstName:firstName,lastName:lastName,email:email,mobileNo:mobileNo,gender:gender,birthday:birthday,address:address,username:username}, { transaction: t });
           
             const auth =await AuthModel.create({
               username:username,
               password:password,
               role:role
             }, { transaction: t });
           
             
             await t.commit();
             return admin;
           } catch (error) {
           
           
             await t.rollback();
           
           }

    
   
  } 
  async function fetchUsers (req,res){
       
    const userlist= await sequelize.query(
        "SELECT firstName,lastName,email,mobileNo,gender,birthday,address,registrationFee,registerFeeSlip FROM `user` order by status desc",
        {
          
          type: QueryTypes.SELECT
        }
      );
    if (userlist === null) {
    return null;
    } else {
    
    return userlist;       }
}
async function fetchAdmins (req,res){
    
    const adminlist= await sequelize.query(
        "SELECT firstName,lastName,email,mobileNo,gender,birthday,address FROM `admin` where status= :status ",
        {
         replacements:{status: 'accepted'},
          type: QueryTypes.SELECT
        }
      );
    
    if (adminlist === null) {
    return null;
    } else {
    
    return adminlist;       }
}
async function acceptReg(req,res){

  const user = await UserModel.update({status:'accepted',registrationFee:'paid'},
  {where:{
    username: req.username
  }});

  return user;

}
async function declineReg(req,res){

  const user = await UserModel.update({status:'declined'},
  {where:{
    username: req.username
  }});

  return user;

}
async function declineAdmin(req,res){

  const user = await AdminModel.update({status:'declined'},
  {where:{
    username: req.username
  }});

  return user;

}

  module.exports={
      addAdmin,
      fetchAdmins,
      fetchUsers,
      acceptReg,
      declineReg,
      declineAdmin,
      
  }