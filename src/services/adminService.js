const {UserModel,hashPassword} =require("../models/userModel");


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
           
           role="Admin";





    const v = await UserModel.create({firstName:firstName,lastName:lastName,email:email,mobileNo:mobileNo,gender:gender,birthday:birthday,address:address,username:username,password:password,role:role});
    return v;
   
  } 

  module.exports={
      addAdmin
  }