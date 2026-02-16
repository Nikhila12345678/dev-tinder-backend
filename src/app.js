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

 //to get all users in database
app.get("/feed",async (req,res) => {
  const users = await User.find({});
  try{
    res.send(users);
  }
  catch(err){
    res.send("something went wrong");
  }
});

//delete user from database
app.delete("/user",async (req,res) => {
  const userId = req.body._id;
  console.log(userId);
  try{
    const user = await User.deleteOne({_id: userId});
    res.send("deleted successfully");
  }
  catch(err){
    res.status(400).send("something went wrong");
  }
});

//update data of user
app.patch("/user",async (req,res) => {
  const userId = req.body._id;
  const data = req.body;

  try{
     const ALLOWED_UPDATES = ["photourl","about","gender","age"];
  const isupdateAllowed = Object.keys(data).every((k) => 
    ALLOWED_UPDATES.includes(k)
);
if(!isupdateAllowed){
   throw new Error("update not allowed"); 
}
if(data.skills.length > 100){
  throw new Error("please add correct skills");
}
   const user = await User.findByIdAndUpdate({_id:userId},data,{
      returnDocument:"after",
      runvaliadtors: true,
    });
    console.log(user);
    res.send("updated");
  }
  catch(err){
    res.status(400).send("update failed" + err.message);
  }
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


