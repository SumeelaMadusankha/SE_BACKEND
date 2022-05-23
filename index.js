const express = require('express'),
app = express(), 
cors = require('cors'),
bodyParser = require('body-parser');
const sequelize = require("./src/configs/database");
// const {userModel} = require("./src/models");
sequelize.sync({ alter: true });

// make server object that contain port property and the value for our server.

const req = require('express/lib/request');
// routers
const {userRoute,loginRoute} = require('./src/routes');


app.get('/',(req,res) =>{
  res.send("Hello Rocky");
})

// use the modules
app.use(cors())
app.use(bodyParser.json());
// use router
app.use('/users', userRoute);
app.use('/app',loginRoute);
// starting the server
const port =  process.env.PORT || 5000;
app.listen( port , () => console.log(`Server started, listening port: ${port}`));








