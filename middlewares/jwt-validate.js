const jwt = require("jsonwebtoken");
function verifyToken(req, res, next){

    

     const bearerHeader =  req.headers['authorization'];
     if(typeof bearerHeader !== 'undefined'){
          const bearerToken = bearerHeader.split(" ")[1];
          req.token  = bearerToken;
          next();
     }else{
        res.status(403).send({ message: "Trouble verifying token or token is NULL." })     }
}

module.exports = {
     verifyToken     
 }