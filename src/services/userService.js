
const {UserModel,hashPassword} =require("../models/userModel");


async function register(req, res) {
    
    
    const  firstName = req.body.firstName,
           lastName = req.body.lastName,
           email= req.body.email,
           mobileNo=req.body.mobileNo,
           gender= req.body.gender,
           birthday= req.body.birthday,
           address= req.body.address,
           username=req.body.username,
           password=hashPassword(req.body.password),
           
           role="User";





    const v = await UserModel.create({firstName:firstName,lastName:lastName,email:email,mobileNo:mobileNo,gender:gender,birthday:birthday,address:address,username:username,password:password,role:role});
    return v;
   
  } 

  async function fetchUsers (req,res){
       
       const users = await UserModel.findAll();
       if (users === null) {
       return null;
       } else {
       console.log(users);
       return users;       }
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



  module.exports = {
   register,
   fetchUsers,
   updateUserProfile
  }