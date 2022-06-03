const {DataTypes} = require('sequelize');

const  sequelize = require("../configs/database")
const Joi = require('joi');
const joiObjectid = require('joi-objectid');
const MealModel =  sequelize.define("mealPlan",
{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    },
    height: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    mealType: {
        type: DataTypes.ENUM("veg","non-veg"),
        allowNull: false,
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
},
{
        sequelize,
        modelName:'MealPlan',
        tableName:'mealPlan',
        timestamps: false,
},
);

function validateMealPlan(mealPlan) {
    
  const schema = Joi.object({
    weight: Joi.number().positive().greater(0).required(),
    height: Joi.number().positive().greater(0).required(),
    mealType: Joi.string().valid('veg','nonVeg').required(),
    note: Joi.string()
  });

  return schema.validate(mealPlan)
}
module.exports = {
  validateMealPlan,
  MealModel
 }
