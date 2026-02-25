const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest.js");

userRouter.get("/user/requests/received", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user;
        
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "intrested",
        }).populate("fromUserId","firstName lastName");
        //"fromUserId",["firstName", "lastName"]);
        res.json({
            message:"Requests Received",
            data: connectionRequests,
        });
    }
    catch(err){
        req.statusCode(400).send("Error: " + err.message);
    }
});

userRouter.get("/user/connections", userAuth,async(req,res) => {
   try{
    const loggedInUser = req.user;

   const connectionRequests = await ConnectionRequest.find({
     $or:[
        {toUserId: loggedInUser._id, status: "accepted"},
        {fromUserId: loggedInUser._id, status: "accepted"},
     ]
   }).populate("fromUserId", "firstName lastName")
   .populate("toUserId", "firstName lastName");

   const data = connectionRequests.map((row) => {
    if(row.fromUserId._id.toString() === loggedInUser._id){
        console.log(row.toUserId);
        return row.toUserId;
    }
    console.log(row.fromUserId);
     return row.fromUserId;
   });
   

   res.json({
    message: "All Connections",
    data: data,
   });
}
 catch(err){
    res.status(400).send("Error: " + err.message);
 }
});
module.exports = userRouter;