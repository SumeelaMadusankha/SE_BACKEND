const express = require('express'),
app = express(), 
cors = require('cors'),
bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const path =  require('path');
const util = require('util');
const cookieparser = require('cookie-parser');
const sequelize = require("./src/configs/database");
const {UserModel} = require("./src/models/userModel");
const {AdminModel}= require("./src/models/adminModel");
const {AuthModel} = require("./src/models/authModel");
const {PaymentModel}=require('./src/models/paymentModel');
const {workoutplanModel} =require('./src/models/workoutPlanModel');
const {MealModel} =require('./src/models/mealPlanModel');
// UserModel.hasOne(PaymentModel, { sourceKey: 'username', foreignKey: 'username', onDelete: "CASCADE",onUpdate:"CASCADE" });
// UserModel.hasOne(AuthModel, { sourceKey: 'username', foreignKey: 'username', onDelete: "CASCADE",onUpdate:"CASCADE" });
// UserModel.hasMany(workoutplanModel, { sourceKey: 'username', foreignKey: 'username', onDelete: "CASCADE",onUpdate:"CASCADE" });
// UserModel.hasMany(MealModel, { sourceKey: 'username', foreignKey: 'username', onDelete: "CASCADE",onUpdate:"CASCADE" });
// AdminModel.hasOne(AuthModel, { sourceKey: 'username', foreignKey: 'username', onDelete: "CASCADE",onUpdate:"CASCADE" });
sequelize.sync({ alter: true });

// make server object that contain port property and the value for our server.

const req = require('express/lib/request');
// routers
const usersRouter = require('./src/routes/userRoute');
const authRouter = require('./src/routes/authRoute');


const adminRouter = require("./src/routes/adminRoute");
const paymentRouter = require("./src/routes/paymentRoute");
const mealplanRoute = require("./src/routes/mealplanRoute");
const workoutplanRoute = require("./src/routes/workoutRoute");
const admin_mealplanRoute = require("./src/routes/admin_mealplanRoute");
const admin_uploadMealplanRoute = require("./src/routes/admin_uploadMealplanRoute");
const admin_uploadWorkplanRoute = require("./src/routes/admin_uploadWorkplanRoute");
const { default: helmet } = require('helmet');
const compression = require('compression');
app.get('/',(req,res) =>{
  res.send("Helo");
})

// use the modules
app.use(cors())
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cookieparser());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }))
// use router
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use('/admin', adminRouter);
app.use('/payment', paymentRouter);
app.use('/mealplan', mealplanRoute);
app.use('/workoutplan', workoutplanRoute);
app.use('/a_mealplan', admin_mealplanRoute);
app.use('/a_uploadMealplan', admin_uploadMealplanRoute);
app.use('/a_uploadWorkplan', admin_uploadWorkplanRoute);

// starting the server
const port =  process.env.PORT || 5000;
app.listen( port , () => console.log(`Server started, listening port: ${port}`));








