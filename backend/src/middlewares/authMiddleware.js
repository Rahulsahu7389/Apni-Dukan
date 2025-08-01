const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) =>{
    console.log('verified');
    
    let token;
    let authHeader =req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token =authHeader.split(" ")[1];
        
        if(!token){
            return res.status(401).json({message:"No token , authorization denied"})
        }
        try {
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            // console.log('here');
            req.user = decode;
            console.log('the decoded user is : ',decode);
            next();
            
        } catch (error) {
            console.log(error);
            
            res.status(400).json({message:"token is invalid or expired"})
        }
    }
    else{
        res.status(401).json({message:"no authorization was sent"})
    }

}

module.exports = verifyToken;