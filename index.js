const express = require('express'),
app = express(), 
cors = require('cors'),
bodyParser = require('body-parser');
const sequelize = require("./src/configs/database");
const {UserModel} = require("./src/models/userModel");
const {AdminModel}= require("./src/models/adminModel");
const {AuthModel} = require("./src/models/authModel");

UserModel.hasOne(AuthModel, { sourceKey: 'username', foreignKey: 'username', onDelete: "CASCADE",onUpdate:"CASCADE" });
AdminModel.hasOne(AuthModel, { sourceKey: 'username', foreignKey: 'username', onDelete: "CASCADE",onUpdate:"CASCADE" });
sequelize.sync({ alter: true });

// make server object that contain port property and the value for our server.

const req = require('express/lib/request');
// routers
const usersRouter = require('./src/routes/userRoute');
const authRouter = require('./src/routes/authRoute');
const adminRouter = require("./src/routes/adminRoute")
app.get('/',(req,res) =>{
  res.send("Helo");
})

// use the modules
app.use(cors())
app.use(bodyParser.json());
// use router
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
// starting the server
const port =  process.env.PORT || 5000;
app.listen( port , () => console.log(`Server started, listening port: ${port}`));








