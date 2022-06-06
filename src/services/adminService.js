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
async function acceptedUserCount (req){
    
  const acceptedUsersCount= await sequelize.query(
      "SELECT distinct count(username) as noOfRegistrations FROM `user` where status= :status ",
      {
       replacements:{status: 'accepted'},
        type: QueryTypes.SELECT
      }
    );
  
  if (acceptedUsersCount === null) {
  return null;
  } else {
  
  return acceptedUsersCount;       }
}

async function pendingUserCount (req){
    
  const pendingRegistrations= await sequelize.query(
      "SELECT distinct count(username) as noOfPendingRegistrations FROM `user` where status= :status ",
      {
       replacements:{status: 'pending'},
        type: QueryTypes.SELECT
      }
    );
  
  if (pendingRegistrations === null) {
  return null;
  } else {
  
  return pendingRegistrations;       }
}

async function acceptedAdminCount (req){
    
  const acceptedAdminsCount= await sequelize.query(
      "SELECT distinct count(username) as noOfAdminCount FROM `admin` where status= :status ",
      {
       replacements:{status: 'accepted'},
        type: QueryTypes.SELECT
      }
    );
  
  if (acceptedAdminsCount === null) {
  return null;
  } else {
  
  return acceptedAdminsCount;       }
}
async function pendingMealPlanRequest (req){
    
  const pendinMelaPlanRequest= await sequelize.query(
      "SELECT distinct count(id) as noOfMealPlanPending FROM `mealplan` where status= :status ",
      {
       replacements:{status: 'pending'},
        type: QueryTypes.SELECT
      }
    );
  
  if (pendinMelaPlanRequest === null) {
  return null;
  } else {
  
  return pendinMelaPlanRequest;       }
}
async function pendingWorkOutPlanRequest (req){
    
  const pendinWorkOutPlanRequest= await sequelize.query(
      "SELECT distinct count(id) as noOfWorkOutPlanPending FROM `workoutplan` where status= :status ",
      {
       replacements:{status: 'pending'},
        type: QueryTypes.SELECT
      }
    );
  
  if (pendinWorkOutPlanRequest === null) {
  return null;
  } else {
  
  return pendinWorkOutPlanRequest;       }
}
async function uploadedWorkOutPlanRequest (req){
    
  const uploadedworkOutPlans= await sequelize.query(
      "SELECT distinct count(id) as noOfWorkOutPlanUploaded FROM `workoutplan` where status= :status ",
      {
       replacements:{status: 'uploaded'},
        type: QueryTypes.SELECT
      }
    );
  
  if (uploadedworkOutPlans === null) {
  return null;
  } else {
  
  return uploadedworkOutPlans;       }
}

async function uploadedmealPlanRequest (req){
    
  const uploadedmealPlans= await sequelize.query(
      "SELECT distinct count(id) as noOfmealPlanUploaded FROM `mealplan` where status= :status ",
      {
       replacements:{status: 'uploaded'},
        type: QueryTypes.SELECT
      }
    );
  
  if (uploadedmealPlans === null) {
  return null;
  } else {
  
  return uploadedmealPlans;       }
}
async function pendingPayments (req){
  const month = new Date().toLocaleString(
    'default', {month: 'long'}
  );
  const year =  new Date().getFullYear().toString();
  const pendingPaymentsCount= await sequelize.query(
      "SELECT distinct count(id) as noOfpaymentCount FROM `monthlypayment` where paymentStatus= :status and month=:month_ and year=:year_ ",
      {
       replacements:{status: 'pending',month_:month,year_:year},
        type: QueryTypes.SELECT
      }
    );
  
  if (pendingPaymentsCount === null) {
  return null;
  } else {
  
  return pendingPaymentsCount;       }
}


async function acceptedPayments (req){
  const month = new Date().toLocaleString(
    'default', {month: 'long'}
  );
  const year =  new Date().getFullYear().toString();
  const acceptedPaymentsCount= await sequelize.query(
      "SELECT distinct count(id) as noOfpaymentCount FROM `monthlypayment` where paymentStatus= :status and month=:month_ and year=:year_ ",
      {
       replacements:{status: 'success',month_:month,year_:year},
        type: QueryTypes.SELECT
      }
    );
  
  if (acceptedPaymentsCount === null) {
  return null;
  } else {
  
  return acceptedPaymentsCount;       }
}
  module.exports={
      addAdmin,
      fetchAdmins,
      fetchUsers,
      acceptReg,
      declineReg,
      declineAdmin,
      fetchPendingUsersList,
      acceptedUserCount,acceptedPayments,pendingPayments,acceptedAdminCount,pendingUserCount,uploadedWorkOutPlanRequest,uploadedmealPlanRequest,pendingMealPlanRequest,pendingWorkOutPlanRequest
      
  }