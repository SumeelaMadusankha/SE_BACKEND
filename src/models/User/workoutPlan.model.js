const {DataTypes} = require('sequelize');

const  sequelize = require("../../configs/database")
const Joi = require('joi');
const workoutplanModel =  sequelize.define("mealPlan",
{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    },
    Cur_Weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    Tar_Weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    Tar_days: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    PractiseDaysPerWeek: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    targetPart: {
        type: DataTypes.ENUM("legs","arms","belly"),
        allowNull: false,
    },
    note: {
        type: DataTypes.TEXT,
        
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
    Cur_Weight: Joi.number().positive().greater(0).required(),
    Tar_Weight: Joi.number().positive().greater(0).required(),
    Tar_days: Joi.number().positive().greater(0).required(),
    PractiseDaysPerWeek: Joi.number().positive().greater(0).required(),
    targetPart: Joi.string().valid('legs','arms','belly').required(),
    note:Joi.string()
  });

  return schema.validate(workoutplanModel)
}
module.exports = {
    validateWorkOutPlan,
  workoutplanModel
 }
