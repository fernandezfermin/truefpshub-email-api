const Emails = require("../models/emails.model.js");
const request_ip = require("../helpers/clientIp.js");



/*=====================
JWT TOKEN
=======================*/
const createToken = require("../helpers/jwt-generator.js");
const jwt = require("jsonwebtoken");

/*=====================
ROUTE TO ENABLE SESSION
=======================*/
  const sessionEnabler = async(req, res) => {

  const clientIp = request_ip.getClientIp(req);
  const token = await createToken.createToken( clientIp );

  res.status(200).send({
    token,
    clientIp,
  });
};


/*=====================
ROUTE TO SUBMIT EMAIL
======================*/

function submitEmail (req, res) {

  let emails = new Emails();
 
  emails.email = req.body.email;
  emails.clientIp = request_ip.getClientIp(req);
    
    jwt.verify(req.token, process.env.SECRET_PASSWORD, (error, authData) => {
      if (error) {
        res.status(403).send({ message: "Token Error" });
      } else {
        
            emails.save((error, successSave) => {
            error
              ? res.status(500).send({ message: "Something went wrong when saving to the database",error })
              : res.status(200).send({ successSave });
          });
        
      }
    });
};


module.exports = {sessionEnabler, submitEmail} ;