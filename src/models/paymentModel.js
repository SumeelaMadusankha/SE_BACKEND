const {DataTypes} = require('sequelize');
const  sequelize = require("../configs/database")
const Joi = require('joi');

const PaymentModel =  sequelize.define("monthlyPayment",
{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
  username:{
    type:DataTypes.STRING,
    allowNull:false,
    
    
  }, month: {
    type: DataTypes.ENUM('January','February','March','April','May','June','July','Agust','September','October','November','December'),
    
  },
  year:{
    type:DataTypes.STRING,
    allowNull:false
  },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
     
      slipPath:{
        type: DataTypes.STRING,
        allowNull:false
      },
      paymentStatus:{
          type:DataTypes.ENUM('pending','success','declined'),
          defaultValue: 'pending'
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
