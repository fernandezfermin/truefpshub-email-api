const jwt = require('jsonwebtoken');



const createToken = ( clientIp ) => {

  

    return new Promise( (resolve, reject) => {
        
        const payload = clientIp;

        jwt.sign({payload}, process.env.SECRET_PASSWORD, {expiresIn: '1h'}, ( err, token ) => {
            
            if ( err ) {
                console.log(err);
                reject( 'The token could not be generated' )
            } else {
                resolve( token );
            }
        })

    })
}




module.exports = {
    createToken
}

