const {DataTypes} = require('sequelize');

const  sequelize = require("../configs/database")
const Joi = require('joi');
const workoutplanModel =  sequelize.define("workOutPlan",
{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    },
    date:{
        type:DataTypes.DATE
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      current_weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    target_weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    target_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    workout_frequency:{
        type: DataTypes.ENUM("Once aweek or never","Twice aweek","Three times week or more"),
        allowNull: false,
    },
    targets: {
        type: DataTypes.ENUM("Build muscle","Lose weight","Get fit","Feel like an athlete"),
        allowNull: false,
    },
    note: {
        type: DataTypes.TEXT,
        
    },
    status:{
    type:DataTypes.ENUM('pending','uploaded'),
    defaultValue: 'pending'
    
    },
    workoutPlan:{
        type: DataTypes.STRING,
        
        }
},
{
        sequelize,
        modelName:'workoutplanModel',
        tableName:'workoutPlan',
        timestamps: false,
},
);

function validateWorkOutPlan(workoutplanModel) {
    
  const schema = Joi.object({
    current_weight: Joi.number().positive().greater(0).required(),
    target_weight: Joi.number().positive().greater(0).required(),
    target_time: Joi.number().positive().greater(0).required(),
    workout_frequency: Joi.string(),
    targets: Joi.string().valid('Build muscle','Lose Weight','Get fit','Feel like an athlete').required(),
   note:Joi.string().allow()
  });

  return schema.validate(workoutplanModel)
}
module.exports = {
    validateWorkOutPlan,
  workoutplanModel
 }
