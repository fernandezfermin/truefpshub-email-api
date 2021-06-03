"use strict"

const jwt = require("jsonwebtoken");




exports.createToken = function(clientIp){

    return jwt.sign({clientIp}, process.env.SECRET_PASSWORD, {expiresIn: '1h'});

}



exports.verifyToken = function (req, res, next){

    

     const bearerHeader =  req.headers['authorization'];

     if(typeof bearerHeader !== 'undefined'){
          const bearerToken = bearerHeader.split(" ")[1];
          req.token  = bearerToken;
          next();
     }else{
         res.sendStatus(403);
     }
}