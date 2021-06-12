const Emails = require('../models/emails.model.js');


const emailExists = async( req, res, next ) => {

   
     //Verificar si el correo existe
     const email = req.body.email;
     const emailExists = await Emails.findOne({ email });
     if ( emailExists ) {
         return res.status(200).send({ message: "Email already registered" });
     }else{
         next();
     }
}



module.exports = {
    emailExists
}

