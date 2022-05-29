const express = require('express'),
router = express.Router();
const paymentController = require('../controllers/paymentController');

const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");

//pay monthly payment
router.post('/',auth,paymentController.monthlyPayment );
//get payment list
router.get('/paymentList',auth,admin,paymentController.getPaymentList)
//accept payment
router.get('/:id',auth,admin,paymentController.acceptPayment)



module.exports = router; 
