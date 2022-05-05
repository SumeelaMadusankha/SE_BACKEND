const express = require('express'),
  app = express(),
  mysql = require('mysql'), // import mysql module
  cors = require('cors'),
  bodyParser = require('body-parser');
  // const dbConfig = require('../configs/db.config');



 // setup database
db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vertualGym'
  })
  
  

// make server object that contain port property and the value for our server.
var server = {
  port: 4040
};
// routers
const usersRouter = require('./src/routes/user.route');



// use the modules
app.use(cors())
app.use(bodyParser.json());
// use router
app.use('/users', usersRouter);
// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));








