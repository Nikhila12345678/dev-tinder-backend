const express = require("express");

const app = express();
app.use("/test",(req,res) => {
    res.send("hello to the server");
});

app.use("/hi",(req,res) =>{
    res.send("hellooooo");
})
app.listen(3000, () =>{
    console.log("server created successfully");
})