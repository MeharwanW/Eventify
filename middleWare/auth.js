const jwt = require("jsonwebtoken");

const verifyToken = async (req,res,next) =>{
    try{
    let token = req.header("Authorization");

    if(!token){
        return res.status(403).send("Access Denied....");
    }

    if(token.startsWith("Bearer ")){
        token = token.slice(7,token.length).trimLeft();
    }

    const varified = jwt.verify(token,process.env.KEY);
    req.user = varified;
    next();

    }catch(e){
        res.status(500).json({error: e.message})
    }
}
module.exports = {
    verifyToken
};