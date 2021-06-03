"use strict"


const express = require("express");
const app = express();
app.use(express.json());


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







module.exports = app;
