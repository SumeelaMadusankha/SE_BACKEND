const {DataTypes} = require('sequelize');

const  sequelize = require("../configs/database")
  
const UserModel =  sequelize.define("users",
{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
      }},
      {
        sequelize,
        modelName:'User',
        tableName:'User',
        timestamps: false,
      },
    
    

);
module.exports =UserModel;