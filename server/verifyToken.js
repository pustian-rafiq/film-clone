const jwt = require('jsonwebtoken')

const verify = (req,res,next) => {
    const authHeader = req.headers.token;

    if(authHeader){
        console.log("http://localhost:8080/server/users/627cf38236949e48fe381ed8")
        const token = authHeader.split(" ")[1];
        console.log(token)

        jwt.verify(token, process.env.SECRET_KEY, (err,user) => {
            if(err){
                res.status(403).json("Token is not valid");
            }
            req.user = user;
            next()
        })
    }else{
        return res.status(401).json("You are not authenticated")
    }
    
}

module.exports = verify