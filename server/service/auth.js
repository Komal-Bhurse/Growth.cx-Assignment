const jwt = require("jsonwebtoken");

require('dotenv').config()

function setUser(user){
    
    return jwt.sign({
       _id: user._id,
       email: user.Email
    },process.env.JWT_SECRET_KEY)
}

function getUser(token){
    if(!token){
        return null;
    }else{
        return jwt.verify(token,process.env.JWT_SECRET_KEY);
    }
    
}

module.exports = {
    setUser,
    getUser,
}