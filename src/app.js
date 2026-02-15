const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async(req,res) => {
    console.log(req.body);
    //creating new instance of user model
    const user = new User(req.body);
    try{
    await user.save();
    res.send("user added successfully");
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
});

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

app.get("/feed",async (req,res) => {
  const users = await User.find({});
  try{
    res.send(users);
  }
  catch(err){
    res.send("something went wrong");
  }
})

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


