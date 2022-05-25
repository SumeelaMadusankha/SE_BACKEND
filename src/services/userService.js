const {UserModel,validateUser} =require("../models");


async function register(req, res) {

    const  firstName = req.body.firstName,
           lastName = req.body.lastName,
           email= req.body.email,
           mobileNo=req.body.mobileNo,
           gender= req.body.gender,
           birthday= req.body.birthday,
           address= req.body.address,
           weight= req.body.weight,
           height= req.body.height;

    const v = await UserModel.UserModel.create({firstName:firstName,lastName:lastName,email:email,mobileNo:mobileNo,gender:gender,birthday:birthday,address:address,weight:weight,height:height});
    return v;
   
} 

  async function fetchUsers (req,res){
       
     const users = await UserModel.UserModel.findAll();
     //   const users = await UserModel.findAll();
       if (users === null) {
       return null;
       } else {
       
       return users;       }
  }
  




  module.exports = {
   register,
   fetchUsers
  }