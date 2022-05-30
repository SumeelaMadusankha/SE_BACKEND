const req = require('express/lib/request');

const  sequelize = require("../configs/database");
const { uploadMealPlanModel } = require("../models");
const path =  require('path');
const { QueryTypes } = require('sequelize');
const util = require('util');

async function uploadmealplan(req,res){
    const 
          description = req.body.description,
          
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
              res.status(500).json({
                message:err
              })
            }
            const mealplan = await uploadMealPlanModel.create({slipPath:URL,description:description});
             return mealplan;

        
}

module.exports={
    uploadmealplan
}