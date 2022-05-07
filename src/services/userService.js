const {UserModel,validateUser} =require("../models/userModel");


async function register(req, res) {
    
    // let values = {
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,  
    // email: req.body.email,
    // mobileNo:req.mobileNo,
    // gender: req.gender,
    // birthday: req.birthday,
    // address: req.address,
    // weight: req.weight,
    // height: req.height,

    // };
    const  firstName = req.body.firstName,
           lastName = req.body.lastName,
           email= req.body.email,
           mobileNo=req.body.mobileNo,
           gender= req.body.gender,
           birthday= req.body.birthday,
           address= req.body.address,
           weight= req.body.weight,
           height= req.body.height;





    const v = await UserModel.create({firstName:firstName,lastName:lastName,email:email,mobileNo:mobileNo,gender:gender,birthday:birthday,address:address,weight:weight,height:height});
    return v;
   
  } 
  




  module.exports = {
   register
  }