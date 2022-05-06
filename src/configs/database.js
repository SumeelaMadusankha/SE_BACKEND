const config = require('./config');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("VertualGym","root", "", {
    host: "localhost",
    port: "3306",
    dialect: 'mysql'
  });
  
   
   
  module.exports = sequelize;