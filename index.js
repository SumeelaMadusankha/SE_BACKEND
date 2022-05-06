const express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser');
const sequelize = require("./src/configs/database");
const UserModel = require("./src/models/userModel");
sequelize.sync({ force: true });

// make server object that contain port property and the value for our server.
var server = {
  port: 4040
};
const req = require('express/lib/request');
// routers
const usersRouter = require('./src/routes/userRoute');



// use the modules
app.use(cors())
app.use(bodyParser.json());
// use router
app.use('/users', usersRouter);
// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));








