const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcryptjs');
const {validateSignupdata} = require("../utils/validation");
const User = require("../models/user");


authRouter.post("/signup", async(req,res) => {
  try{
  //validation of data
  validateSignupdata(req);
  const {firstName, lastName, emailId, password,photourl,skills} = req.body;
  //Encrypt the password
  const passwordhash =await bcrypt.hash(password,10);
  console.log(passwordhash);

    console.log(req.body);
    //creating new instance of user model
    const user = new User({
      firstName,lastName,password:passwordhash,emailId,photourl,skills
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    
    res.json({message:"user added successfully", data:savedUser});
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
});

authRouter.post("/login", async(req,res) => {
  try{
    const {emailId,password} = req.body;
    
    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordvalid = await user.validatepassword(password);
    console.log(password);
    console.log(user.password);
    console.log(isPasswordvalid);
    if(isPasswordvalid){

      //create a JWT token
      const token = await user.getJWT();
      //add the token to cookie and send the response back to user
      res.cookie("token",token,{httpOnly:true});
      res.send(user);

    }
    else{
      throw new Error("Wrong password");
    }
  }
  catch(err){
    res.status(400).send("Error: " + err.message);
  }
}
);

authRouter.post("/logout",async(req, res) => {
   res.cookie("token",null,{
    expires: new Date(Date.now())
   });
   res.send("Logged out");
});

module.exports = authRouter;