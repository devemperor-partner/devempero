const jwt=require("jsonwebtoken")
const privateKey=process.env.privateKey;

const genToken=(userID)=>{
const token=jwt.sign({userID},privateKey)
return token
}
module.exports=genToken