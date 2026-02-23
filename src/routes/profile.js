const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("/home/rgukt/Desktop/dev tinder backend/src/middlewares/auth.js");
const {validateEditProfiledata} = require("/home/rgukt/Desktop/dev tinder backend/src/utils/validation.js");

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