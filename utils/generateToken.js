const jwt = require('jsonwebtoken');

function generateToken(idCliente){
    return jwt.sign({id:idCliente},process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
}

module.exports = generateToken;