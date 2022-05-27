const {AdminModel} =require("../models/adminModel");
const {AuthModel,hashPassword} =require("../models/authModel");
const { QueryTypes } = require('sequelize');
const  sequelize = require("../configs/database")

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
        "SELECT firstName,lastName,email,mobileNo,gender,birthday,address FROM `user` ",
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
        "SELECT firstName,lastName,email,mobileNo,gender,birthday,address FROM admin",
        {
         
          type: QueryTypes.SELECT
        }
      );
    
    if (adminlist === null) {
    return null;
    } else {
    
    return adminlist;       }
}
  module.exports={
      addAdmin,
      fetchAdmins,
      fetchUsers
  }