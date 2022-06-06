const {DataTypes} = require('sequelize');

const  sequelize = require("../configs/database")
const Joi = require('joi');
const joiObjectid = require('joi-objectid');
const MealModel =  sequelize.define("mealplan",
{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    },
    req_date:{
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
    veg_prefer: {
        type: DataTypes.ENUM("veg","non-veg"),
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status:{
        type:DataTypes.ENUM('pending','uploaded'),
        defaultValue: 'pending'
        
        },
        mealPlan:{
            type: DataTypes.STRING,
            
            }
},
{
        sequelize,
        modelName:'Mealplan',
        tableName:'mealplan',
        timestamps: false,
},
);

function validateMealPlan(mealPlan) {
    
  const schema = Joi.object({
    current_weight: Joi.number().positive().greater(0).required(),
    target_weight: Joi.number().positive().greater(0).required(),
    veg_prefer: Joi.string().valid('veg','non-veg').required(),
   note:Joi.string().allow(),
    target_time:Joi.number().positive().greater(0).required(),
  });

  return schema.validate(mealPlan)
}
module.exports = {
  validateMealPlan,
  MealModel
 }
