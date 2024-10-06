
// const User = require('../models/User')
// var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

require('dotenv/config')

// process.env.WhatIsYourName

// const verifyToken = (req,res,next) => {
//     let token ;
//     let authHeader = req.headers.Authorization || req.headers.authorization

//     if(authHeader && authHeader.startsWith("Bearer")){
//         token = authHeader.split(" ")[1]
//         if(!token){
//             return res.status(404).json({err:'token is not avaliable'})
//         }
//         try{
//          const decode = jwt.verify(token, process.env.WhatIsYourName)
//          req.user = decode
//          console.log('req.user', req.user)
//          next()
//         }catch(err){
//             return res.status(500).json({err:'internal server error'})
//         }
    

//     }else{
//         return res.status(404).json({err:'token is not avaliable authorization denied'})
//     }
    
// }

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization; // Lowercase authorization header

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(404).json({ err: 'Token is not available' });
        }
        try {
            console.log('Token:', token);
            console.log('Secret:', process.env.WhatIsYourName);  // Log secret
            const decode = jwt.verify(token, process.env.WhatIsYourName);  // Corrected secret variable
            req.user = decode;
            console.log('req.user', req.user);
            next();
        } catch (err) {
            console.error('JWT Verification Error:', err);  // Log the actual error
            return res.status(500).json({ err: 'Internal server error' });
        }
    } else {
        return res.status(404).json({ err: 'Token not available, authorization denied' });
    }
};



module.exports = verifyToken