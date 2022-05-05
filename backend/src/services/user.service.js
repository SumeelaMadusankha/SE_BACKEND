// const db = require('./db.service');
const helper = require('../utils/helper.util');
// const config = require('../configs/general.config');


async function register(req, res) {
    let sql = `INSERT INTO users(firstName, lastName) VALUES (?)`;
    let values = [
      req.body.firstName,
      req.body.lastName
    ];
    db.query(sql, [values], function(err, data, fields) {
      if (err) throw err;

      return data;
    //   res.json({
    //     status: 200,
    //     message: "New user added successfully",
    //      data:data
    //   })
    })
  }
  module.exports = {
   register
  }