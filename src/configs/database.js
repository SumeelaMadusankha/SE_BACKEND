const config = require('./config');

const { Sequelize } = require('sequelize');
const {database,host,jwtPrivateKey,password,port,user}= require('../configs/config')
const sequelize = new Sequelize(database,user, password, {
    host: host,
    port: port,
    dialect: 'mysql'
  });
  
   
   
  module.exports = sequelize;