import jwt from 'jsonwebtoken';
const config = require('./../config/config.js');

const authVerification =  (req, res, next) => {
    let token = null;   
    if(req.headers.authorization){
        token =  req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(403).send({  //add return to avoid [ERR_HTTP_HEADERS_SENT]: Can't set headers after they are sent to the client
          auth: false,
          message: `Token wasn't send`

        });
    }
    //let's verify token
    jwt.verify(token, config.secretCode, (error, decoded) => {
        if (error) {
            res.status(500).send({
                auth: false,
                message: `Authentication error`,
                decoded
            });
        }
        next();  // go ahead after verify
    })
    
}

export default authVerification