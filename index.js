const express = require('express'),
app = express(), 
cors = require('cors'),
bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const path =  require('path');
const util = require('util');
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
const adminRouter = require("./src/routes/adminRoute");
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
app.use(express.static("./public"));
// use router
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.post("/upload",async (req,res)=>{
  try{
  const file = req.files.xyz;
  const fileName = file.name;
  const size = file.data.length;
  const extension = path.extname(fileName);
  const allowedExtensions=/png|pdf|jpeg|jpg|gif/;
  if (!allowedExtensions.test(extension)) throw("Unsurpoted extension!");
  const md5 = file.md5;
  const URL ="/uploads/"+md5+extension;
   await util.promisify(file.mv)("./public"+URL);
   res.json({
     message: "File Uploaded successfully",
     url:URL

   })
  }catch(err){
    res.status(500).json({
      message:err
    })
  }

})
// starting the server
const port =  process.env.PORT || 5000;
app.listen( port , () => console.log(`Server started, listening port: ${port}`));








