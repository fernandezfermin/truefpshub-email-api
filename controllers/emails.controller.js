"use strict"

//Importamos el modelo products
const Emails = require("../models/emails.model.js");
const validator = require('validator');


function getClientIp(req) {
  var ipAddress;
  // Amazon EC2 / Heroku workaround to get real client IP
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // Ensure getting client IP address still works in
    // development environment
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};




/*=====================
JWT TOKEN
=======================*/
const md_token = require("../token/jwt.js");
const jwt = require("jsonwebtoken");

/*=====================
ROUTE TO ENABLE SESSION
=======================*/
function sessionEnabler(req, res) {
  const clientIp = req.ip;

  res.status(200).send({
    token: md_token.createToken(clientIp),
    clientIp,
  });
};


/*=====================
ROUTE TO SUBMIT EMAIL
=======================*/
function submitEmail (req, res) {
  
  //Instance of Emails object
  let emails = new Emails();
 
  emails.email = req.body.email;
  emails.clientIp = getClientIp(req);

  //Validate if emails exists
  Emails.findOne({ email: emails.email }, (err, user) => {
    user ? res.status(200).send({ message: "User already registered" }) :

    jwt.verify(req.token, process.env.SECRET_PASSWORD, (error, authData) => {
      if (error) {
        res.status(403).send({ message: "Token Error" });
      } else {
        if (validator.isEmail(emails.email)) {
          emails.save((error, successSave) => {
            error
              ? res.status(500).send({ message: "Something went wrong when saving to the database" })
              : res.status(200).send({ successSave });
          });
        } else {
          res.status(400).send({ message: "Incorrect Email" });
        }
      }
    });
  });
};

module.exports = {sessionEnabler, submitEmail} ;