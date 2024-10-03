require("dotenv").config();
const jwt=require("jsonwebtoken")


module.exports.createSecretToken=(id,superuser)=>{
    return jwt.sign({id,superuser},process.env.TOKEN_KEY,{
        expiresIn:3*24*60*60,
    });
};