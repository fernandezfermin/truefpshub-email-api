"use strict"
const express = require("express");
const router = express.Router();

/*=====================
VALIDATION MIDDLEWARES
=======================*/

  const  {validateFields} = require("../middlewares/validate-fields");
  const  {emailExists} =  require("../middlewares/db-validators");

/*=====================
CHARGE EMAIL CONTROLLER
=======================*/
var EmailsController = require("../controllers/emails.controller.js");

/*=====================
JWT TOKEN
=======================*/
const {verifyToken} = require("../middlewares/jwt-validate.js");

/*=====================
ROUTE TO ENABLE SESSION
=======================*/
router.get("/session-enabler", EmailsController.sessionEnabler);


/*=====================
ROUTE TO SUBMIT EMAIL
=======================*/

router.post("/sendmail", [validateFields, emailExists, verifyToken ], EmailsController.submitEmail);
module.exports = router;
