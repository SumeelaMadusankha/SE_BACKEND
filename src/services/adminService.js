const {AdminModel} =require("../models/adminModel");
const {AuthModel,hashPassword} =require("../models/authModel");
const { QueryTypes } = require('sequelize');
const  sequelize = require("../configs/database");
const { UserModel } = require("../models/userModel");

async function addAdmin(req, res) {


    const  Name = req.body.Name,
          
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
             const admin = await AdminModel.create({Name:Name,email:email,mobileNo:mobileNo,gender:gender,birthday:birthday,address:address,username:username}, { transaction: t });
           
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
        "SELECT Name,username,email,mobileNo,gender,birthday,address,registrationFee,registerFeeSlip FROM `user` where status=:status order by status desc",
        {
          replacements:{status: 'accepted'},
          type: QueryTypes.SELECT
        }
      );
    if (userlist === null) {
    return null;
    } else {
    
    return userlist;       }
}
async function fetchPendingUsersList (req,res){
       
  const userlist= await sequelize.query(
      "SELECT Name,email,mobileNo,gender,birthday,address,registrationFee,registerFeeSlip,username FROM `user` where status=:status order by status desc",
      {
        replacements:{status: 'pending'},
        type: QueryTypes.SELECT
      }
    );
  if (userlist === null) {
  return null;
  } else {
  
  return userlist;       }
}


async function fetchAdmins (req){
    
    const adminlist= await sequelize.query(
        "SELECT Name,username,email,mobileNo,gender,birthday,address FROM `admin` where status= :status and username!=:username ",
        {
         replacements:{status: 'accepted',username:req},
          type: QueryTypes.SELECT
        }
      );
    
    if (adminlist === null) {
    return null;
    } else {
    
    return adminlist;       }
}
async function acceptReg(req,res){
// return res.send(req.username)
  const user = await UserModel.update({status:'accepted',	registrationFee:'paid'},{
    where: {
      username: req.username
    }
  });

  return user;

}
async function declineReg(req,res){

  const user = await sequelize.query(
    "update user set status=:status,registrationFee=:fee where username=:username ",
    {
     replacements:{status: 'declined',fee:"notpaid",username:req.username},
      type: QueryTypes.UPDATE
    }
  );


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
      fetchPendingUsersList
      
  }