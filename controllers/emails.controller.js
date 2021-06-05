"use strict"

//Importamos el modelo products
const Emails = require("../models/emails.model.js");
const validator = require('validator');

const request_ip = require("../middlewares/clientIp.js");



/*=====================
JWT TOKEN
=======================*/
const md_token = require("../token/jwt.js");
const jwt = require("jsonwebtoken");

/*=====================
ROUTE TO ENABLE SESSION
=======================*/
  function sessionEnabler(req, res) {
  const clientIp = request_ip.getClientIp(req);

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
  emails.clientIp = request_ip.getClientIp(req);

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