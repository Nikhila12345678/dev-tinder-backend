const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
const User = require("./models/user");
const {validateSignupdata} = require("/home/rgukt/Desktop/dev tinder backend/src/utils/validation.js");
const bcrypt = require("bcryptjs");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");


app.use(express.json());
app.use(cookieparser());

app.post("/signup", async(req,res) => {
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

    await user.save();
    res.send("user added successfully");
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
});

app.post("/login", async(req,res) => {
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
      res.send("Login Successful!!");
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

 //get user by email
 app.get("/user",async (req,res) => {
  const usermail = req.body.emailId;
  console.log(usermail);
  try{
    const users = await User.find({emailId: usermail});
    if(users.length === 0)
      res.send("user not found");
    res.send(users);
  }
  catch(err){
    res.status(400).send("something went wrong");
  }
 });

 app.get("/profile",userAuth,async (req,res) => {
  try {
  const user = req.user;
  res.send(user);
  }
  catch(err){
    res.status(400).send("Error:" + err.message);
  }
 });

 app.post("/sendconnectionrequest", userAuth, async(req,res) => {
  const user = req.user;
  //sending connection request
  console.log("sending a connection request");
  res.send("Connection Request Sent!");
 });

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () =>{
    console.log("server created successfully");
});
  })   
  .catch((err) => {
    console.log("Database cannot be connected");
  });


