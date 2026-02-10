const express = require("express");

const app = express();
app.use("/",(err,req,res,next) => {
    if(err){
      res.status(500).send("something went1 wrong");
    }
});


app.get("/user",(req,res) => {
    try{
    throw new Error("gfuwi");
    res.send("user data");
    }catch(err){
        res.status(500).send("contact support team");
    }
});

app.use("/",(err,req,res,next) => {
    if(err){
      res.status(500).send("something went wrong");
    }
});

app.listen(3000, () =>{
    console.log("server created successfully");
});