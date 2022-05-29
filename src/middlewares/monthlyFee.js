const payment = require('../services/paymentService')

module.exports = async function (req, res, next) {
    const user = await payment.checkMonthlyFeePaid(req,res);
    if(user ===null){
        res.status(403).send("Monthly payment has not been paid");
    }
    next()
  }