
const jwt = require('jsonwebtoken')
const env = require('../functions/env-var')
exports.verifyToken = (request,response,next) => {

    try {

        console.log(request.headers);
        
        const token = request.headers.authorization.split(" ")[1];
        console.log(token);
        
       const decode = jwt.verify(token,env.jwt_sectet_key)

       request.userdate = decode;

       console.log('decode');
       

    //    console.log(decode);

    //    console.log(request.userdate);
       
       

        next();
        
    } catch (error) {
        return response.status(401).json({
            message:'authorization failed you should login again'
        })
        
    }
 

  


}
