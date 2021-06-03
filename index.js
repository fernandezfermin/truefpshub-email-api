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
const port = process.env.PORT;




/*=====================
MONGO CONNECTION
=======================*/

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true}, (error, response) => {

    try {

        console.log("Connection established successfully.")

        app.listen(port, function() {
            console.log("API Running in:" + port)
        })
        
    } catch (error) {

        throw error;
    }

})

