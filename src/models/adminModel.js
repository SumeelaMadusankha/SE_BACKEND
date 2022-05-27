const {DataTypes} = require('sequelize');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const  sequelize = require("../configs/database")
const Joi = require('joi');

const AdminModel =  sequelize.define("users",
{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
        unique: true
        
      },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
     
      mobileNo: {
        type: DataTypes.STRING,
      },
      gender: {
          type: DataTypes.ENUM("male","female"),
          allowNull: false,
      },
      birthday:{
          type: DataTypes.DATE,
          allowNull: false,
      },address: {
          type: DataTypes.STRING,
          allowNull: false,
      }
    },
      {
        sequelize,
        modelName:'Admin',
        tableName:'admin',
        timestamps: false,
      },
    
    

);


function validateAdmin(user) {
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
  validateAdmin,
  AdminModel,
  
  validateUpdateUser
 }
