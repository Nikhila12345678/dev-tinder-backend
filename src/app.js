const express = require("express");

const app = express();

// app.get("/user",(req,res) => {
//     console.log(req.query);
//     res.end("data")
// });

// app.post("/user/:userId/:name",(req,res) => {
//     console.log(req.params);
//     res.end("data saved")   //just checks strings of post only
// });

// app.post("/user",(req,res) => {
//     console.log(req.params)
//     res.end("data d")   //just checks strings of post only
// });

// app.use("/test",(req,res) => {
//     res.send("hello to the server"); //use just checks string whetehr it is get or post
// });

// app.use("/test/2",(req,res) => {
//     res.send("hello ");
// });

// app.use("/hi",(req,res) =>{
//     res.send("hellooooo");
// });

// //ab*cc-->can write anything between ab & cc
// //ab?c-->can get without b also
// //a(bc)?d-->bc is optional
// //ab+d-->
// // /.*fly$/-->starts with anything ends with fly

// app.use("/",(req,res) => {
//     res.send("he to the server");
// });

//route handlers
 //app.use("/route",rh,[rh1,rh2],rh3,rh4)
app.use("/user",(req,res,next) => {
    console.log("");
    next();
    res.send("response");
    
},   //no two responses can send through 1 url
(req,res,next) => {
    res.send("response2");
},
(req,res,next) => {
    res.send("response3");
}
);

//handle auth with middleware for all get and post methods
const {adminauth} = require("/home/rgukt/Desktop/dev tinder backend/middlewares/auth.js"); 
app.use("/admin",adminauth);
app.get("/admin/getalldata",(req,res,next) => {
   res.send("data sent");
});

app.get("/admin/deleteuser",(req,res) => {
    res.send("deleted a user");
});

app.listen(3000, () =>{
    console.log("server created successfully");
});