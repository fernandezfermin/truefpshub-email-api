const validator = require('validator');


const validateFields = ( req, res, next ) => {
    email = req.body.email;
    if(!req.body.email){
        return res.status(400).send({ message: "Empty email" });
    }
          
    if(!validator.isEmail(req.body.email)){
        return res.status(400).send({ message: "Incorrect Syntax Email" });
    }
    
    

    
    next();
    
}



module.exports = {
    validateFields
}
