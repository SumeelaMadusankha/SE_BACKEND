const req = require('express/lib/request');

const  sequelize = require("../configs/database");
const  {MealModel}  = require("../models/mealPlanModel");
const path =  require('path');
const { QueryTypes } = require('sequelize');
const util = require('util');

async function uploadmealplan(req,res){
    const 
          file =req.files.slip;
          
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
              res.status(400).send(extension+'is not allowed'
              );
            }
            const mealplan = await MealModel.update({status:'uploaded',	mealPlan:URL},{
              where: {
                req: req.body.id
              }
            });
             return mealplan;

        
}

module.exports={
    uploadmealplan
}