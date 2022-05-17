
module.exports = function (req, res, next) { 
    // 401 Unauthorized
    // 403 Forbidden (Here even they have correct jwt they cant access)
    
    if (req.user.role!='Admin') return res.status(403).send('Access denied.');
  
    next();
  }