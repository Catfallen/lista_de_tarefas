const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    let token;
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer ')){
        token = authHeader.split(' ')[1];
    }

    if(!token && req.cookies.token){
        token = req.cookies.token;
    }

    if (!token){
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.clienteId = decoded.id;
        next();
    }catch (err){
        res.status(403).json({error: 'Token invalido'});
    }
}

module.exports = verifyToken;