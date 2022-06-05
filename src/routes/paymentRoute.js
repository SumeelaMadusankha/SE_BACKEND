const express = require('express'),
router = express.Router();
const paymentController = require('../controllers/paymentController');

const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");
const payment=require("../middlewares/monthlyFee");
const accept=require("../middlewares/adminAccepted");   

//pay monthly payment
router.post('/',auth,paymentController.monthlyPayment );
//get payment list
router.get('/paymentList',auth,admin,paymentController.getPaymentList)
router.get('/paymentOfSpecificUser',auth,paymentController.getPaymentListOfUser)
//accept payment
router.get('/:id',auth,admin,paymentController.acceptPayment)
router.get('/decline/:id',auth,admin,paymentController.declinePayment)


module.exports = router; 
