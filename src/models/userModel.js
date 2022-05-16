const {DataTypes} = require('sequelize');

const  sequelize = require("../configs/database")
const Joi = require('joi');
const { string } = require('joi');
const UserModel =  sequelize.define("users",
{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
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
      },
      weight: {
          type: DataTypes.DOUBLE,
          allowNull: false,
      },
      height: {
          type: DataTypes.DOUBLE,
          allowNull: false,
      },
      username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
        
      },password:{
        type:DataTypes.STRING,
        allowNull:false
      },
      role:{
        type:DataTypes.ENUM("Admin","User")
      }
    },
      {
        sequelize,
        modelName:'User',
        tableName:'users',
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
    weight: Joi.number().positive().greater(0).required(),
    height: Joi.number().positive().greater(0).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string().valid('Admin', 'User').required()
  });

  return schema.validate(user)
}
module.exports = {
  validateUser,
  UserModel
 }
