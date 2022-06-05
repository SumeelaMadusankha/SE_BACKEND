const req = require('express/lib/request');

const  sequelize = require("../configs/database");
const  {workoutplanModel}  = require("../models/workoutPlanModel");
const path =  require('path');
const { QueryTypes } = require('sequelize');
const util = require('util');

async function uploadworkoutplan(req,res){
    const 
         
          
          file =req.files.file_;
          
          try{
            var fileName = file.name;
            
            var size = file.data.length;
            
            var extension = path.extname(fileName);
            
            var allowedExtensions=/png|pdf|jpeg|jpg|gif/;
            
            
            if (!allowedExtensions.test(extension)) throw("Unsurpoted extension!");
            var md5 = file.md5;
            var URL ="/uploads/"+md5+extension;
         
             await util.promisify(file.mv)("./public"+URL);

            }catch(err){
              res.status(500).json({
                message:err
              })
            }
            const workoutplan = await workoutplanModel.update({status:'uploaded',	workoutPlan:URL},{
              where: {
                id: req.body.id_
              }
            });
             return workoutplan;

        
}

module.exports={
    uploadworkoutplan
}