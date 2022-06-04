const {DataTypes} = require('sequelize');

const  sequelize = require("../configs/database")
const Joi = require('joi');
const joiObjectid = require('joi-objectid');

const uploadMealPlanModel =  sequelize.define("uploadMealPlan",
{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
     
      slipPath:{
        type: DataTypes.STRING,
        allowNull:false
      },
      
    },
      {
        sequelize,
        modelName:'uploadMealPlanModel',
        tableName:'uploadMealPlan',
        timestamps: false,
      },
    
    

);

module.exports = {
  
    uploadMealPlanModel
 }