"use strict"

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }



  
/*====================
MONGODB LIBRARY
======================*/

const mongoose = require("mongoose");



/*====================
EXPRESS MODULE
======================*/
const app = require("./app");




/*=====================
MONGO CONNECTION
=======================*/

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true}, (error, response) => {

    try {

        console.log("Connection established successfully.")

        app.listen(process.env.PORT || 80)
        
    } catch (error) {

        throw error;
    }

})

