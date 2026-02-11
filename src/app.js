const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
const User = require("./models/user");

app.post("/signup", async(req,res) => {
    //creating new instance of user model
    const user = new User({
        firstName: "nikhila",
        lastName: "kodigudla",
        emailId: "nikhilakodigudla.com",
        password: "123",
        age: 20,
    });
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


