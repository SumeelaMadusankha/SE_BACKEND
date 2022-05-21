const express = require('express'),
app = express(), 
cors = require('cors'),
bodyParser = require('body-parser');
const sequelize = require("./src/configs/database");
const UserModel = require("./src/models/userModel");
sequelize.sync({ alter: true });

// make server object that contain port property and the value for our server.

const req = require('express/lib/request');
// routers
const usersRouter = require('./src/routes/userRoute');
const loginRouter = require('./src/routes/login.route');

app.get('/',(req,res) =>{
  res.send("Hello Rocky");
})

// use the modules
app.use(cors())
app.use(bodyParser.json());
// use router
app.use('/users', usersRouter);
app.use('/app',loginRouter);
// starting the server
const port =  process.env.PORT || 5000;
app.listen( port , () => console.log(`Server started, listening port: ${port}`));








