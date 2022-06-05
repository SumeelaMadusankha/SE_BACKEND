const {DataTypes} = require('sequelize');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const  sequelize = require("../configs/database")
const Joi = require('joi');

const AuthModel =  sequelize.define("userAccount",
{
    
   
      
      username:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
        unique: true
        
      },password:{
        type:DataTypes.STRING,
        allowNull:false
      },
      role:{
          type:DataTypes.ENUM('Admin','User'),
          allowNull:false
      }
    },
      {
        sequelize,
        modelName:'Auth',
        tableName:'userAccount',
        timestamps: false,
      },
    
    

);







function hashPassword(password) {
    const salt = genSaltSync(12);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
}

 function verifyPassword(passwordAttempted, hashedPassword) {
    return compareSync(passwordAttempted, hashedPassword);
}

module.exports = {
  AuthModel,
  hashPassword,
  verifyPassword
 }
