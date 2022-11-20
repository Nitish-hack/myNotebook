const jwt=require("jsonwebtoken");
const JWT_SECRET='mynameisnitishakaincredible'
const fetchuser=(req,res,next)=>{
//get the user from jwt token and add id to req object
const token=req.header("auth-token");     //auth token is the name of parameter in the header of request 
if(!token){
 res.status(401).send("please authenticate using a valid token");
}
try {
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();        //is the function called after execution of this middle ware


} catch (error) {
    res.status(401).send("some errors occured: please authenticate using a valid token");
}
}
module.exports=fetchuser;