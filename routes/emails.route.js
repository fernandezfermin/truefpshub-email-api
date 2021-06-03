"use strict";

const express = require("express");

const router = express.Router();


/*=====================
CHARGE EMAIL CONTROLLER
=======================*/
var EmailsController = require("../controllers/emails.controller.js");

/*=====================
JWT TOKEN
=======================*/
const md_token = require("../token/jwt.js");

/*=====================
ROUTE TO ENABLE SESSION
=======================*/
router.get("/session-enabler", EmailsController.sessionEnabler);


/*=====================
ROUTE TO SUBMIT EMAIL
=======================*/

router.post("/sendmail", [md_token.verifyToken], EmailsController.submitEmail);

module.exports = router;
