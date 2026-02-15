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


