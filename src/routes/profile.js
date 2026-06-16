const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const {validateEditProfiledata} = require("../utils/validation.js");

 profileRouter.get("/profile",userAuth,async (req,res) => {
  try {
  const user = req.user;
  res.send(user);
  }
  catch(err){
    res.status(400).send("Error:" + err.message);
  }
 });

 profileRouter.patch("/profile/edit", userAuth, async(req,res) => {
    try{
        if(!validateEditProfiledata(req))
            throw new Error("Invalid Edit Request");

        const loggedInUser = req.user;
        console.log(loggedInUser);
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName} your data is updated successfully`);
    }
    catch(err){
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        res.status(400).send("Error :" + err.message);
    }
 });

 profileRouter.get("/profile/view",userAuth,(req,res) =>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error: "+ err.message);
    }
 })

module.exports = profileRouter;