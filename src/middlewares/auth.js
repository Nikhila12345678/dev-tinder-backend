const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) => {
   try{ //read token from the req cookies
    const {token} = req.cookies;
    if(!token){
        throw new Error("Token is not valid");
    }
    const decodeobj = await jwt.verify(token, "DEV@Tinder");
    const {_id} = decodeobj;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("user not found");
    }
    req.user = user;
    next();
}
catch(err){
    res.status(400).send("Error: "+ err.message);
}
};
module.exports = {userAuth};