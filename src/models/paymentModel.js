const {DataTypes} = require('sequelize');
const  sequelize = require("../configs/database")
const Joi = require('joi');

const UserModel =  sequelize.define("monthlyPayment",
{
    
  username:{
    type:DataTypes.STRING,
    allowNull:false,
    primaryKey:true,
    unique: true
    
  },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      month: {
        type: DataTypes.ENUM('January','February','March','April','May','June','July','Agust','September','October','November','December'),
      }
         
  
      
    },
      {
        sequelize,
        modelName:'User',
        tableName:'user',
        timestamps: false,
      },
    
    

);


function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    mobileNo:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    gender: Joi.string().valid('male','female').required(),
    birthday: Joi.date().raw().required(),
    address: Joi.string().min(1).max(50).required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    
  });


  return schema.validate(user)
}

function validateUpdateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    mobileNo:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    gender: Joi.string().valid('male','female').required(),
    birthday: Joi.date().raw().required(),
    address: Joi.string().min(1).max(50).required(),
   
  });
  

  return schema.validate(user)
}






module.exports = {
  validateUser,
  UserModel,
  
  validateUpdateUser
 }
