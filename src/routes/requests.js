const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require("/home/rgukt/Desktop/dev tinder backend/src/middlewares/auth.js");

 requestRouter.post("/sendconnectionrequest", userAuth, async(req,res) => {
  const user = req.user;
  //sending connection request
  console.log("sending a connection request");
  res.send("Connection Request Sent!");
 });

module.exports = requestRouter;