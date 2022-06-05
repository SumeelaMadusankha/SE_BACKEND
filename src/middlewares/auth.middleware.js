require('dotenv').config();
const jwt = require('jsonwebtoken');
function authenticateToken(req,res,next){
    const authToken = req.header('x-auth-token');
    
    // res.send(authToken);

    if(authToken == null) res.status(401).send("Access denied: No token provided!");

    try{
      
      const decodeUser = jwt.verify(authToken,process.env.ACCESS_TOKEN_SECRET);
      // res.send(decodeUser);
      next();
    }
    catch(ex){
      res.status(400).send("Invalid token");
    }

}

module.exports = {authenticateToken}