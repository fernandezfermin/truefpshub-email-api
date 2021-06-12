"use strict"


const express = require("express");
const app = express();
app.use(express.json());
const helmet = require('helmet');


/*=============================================
SECURITY AND VULNERABILITY PROTECTION
=============================================*/
app.use(helmet());



/*=============================================
ROUTES
=============================================*/
const emailsRoute = require("./routes/emails.route.js")



/*=============================================
HTTP HEADERS
=============================================*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Allow", "GET, POST, PUT, DELETE");
    next();
  });
  


/*=============================================
BASE ROUTES
=============================================*/
app.use("/api", emailsRoute);


/*=============================================
DEFAULT ERROR HANDLER
=============================================*/

app.use((err, req, res, next) => {
  // This is necessary to detect any unmatched routes that should be a 404
  if (!err) {
    return next()
  }else{
    //res.sendStatus(400,err);
    res.status(400).send({ message: "Bad request" });
  }

  
})

app.use((req, res) => res.sendStatus(404));

module.exports = app;
