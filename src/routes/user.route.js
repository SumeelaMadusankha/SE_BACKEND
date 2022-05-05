const express = require('express'),
  router = express.Router();
  const userController = require('../controllers/user.controller');
// get user lists
router.get('/list', function(req, res) {
  let sql = `SELECT * FROM users`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

// create new user
router.post('/new',userController.register);

module.exports = router;