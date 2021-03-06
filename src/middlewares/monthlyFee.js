const { user } = require('../configs/config');
const { isEmpty } = require('lodash');
const payment = require('../services/paymentService')
const usermodel = require('../services/userService')
module.exports = async function (req, res, next) {
    if (req.user['role']=='User') {
      
        const user_ = await payment.checkMonthlyFeePaid(req,res);
        if(isEmpty(user_)){
            return res.status(601).send("Monthly payment has not been paid");
        }
    }
   
    next()
  }