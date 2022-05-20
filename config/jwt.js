const jwt = require('jsonwebtoken');

module.exports = function auth(req,res,next)
{
    const token = req.header('Authorization');
    
    if(!token) return res.status(401).send("Access Denied");

    
        const verified = jwt.verify(token, 'secret');
   

       if(verified )
       {
        req.renter = verified;
        next();
       }
       else {
        res.status(400).send('Invalid Token');

       }
    
}