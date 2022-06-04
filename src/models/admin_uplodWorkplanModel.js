const {DataTypes} = require('sequelize');

const  sequelize = require("../configs/database")
const Joi = require('joi');
const joiObjectid = require('joi-objectid');

const uploadWorkoutPlanModel =  sequelize.define("uploadWorkoutPlan",
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
        modelName:'uploadWorkPlanModel',
        tableName:'uploadWorkoutPlan',
        timestamps: false,
      },
    
    

);

module.exports = {
    uploadWorkoutPlanModel
 }