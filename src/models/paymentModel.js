const {DataTypes} = require('sequelize');
const  sequelize = require("../configs/database")
const Joi = require('joi');

const PaymentModel =  sequelize.define("monthlyPayment",
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
        modelName:'Payment',
        tableName:'monthlyPayment',
        timestamps: false,
      },
    
    

);










module.exports = {
  
  PaymentModel
 }
