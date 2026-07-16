const express = require("express");
const chatRouter = express.Router();
const Chat = require("../models/chat");
const {userAuth} = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
   const {targetUserId} = req.params;
   const userId = req.user._id;
   try{
     const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId},
                    { fromUserId: toUserId, toUserId: fromUserId}
                ],
        });

    if(!existingConnectionRequest || existingConnectionRequest.status !== "intrested"){
        res.send({message: "You are not connected with this user"});
    }   
    let chat = await Chat.findOne({
        participants: {$all: [userId, targetUserId]},
    }).populate({
        path: "messages.senderId",
        select: "firstName LastName",
   });
    if(!chat){
        chat = new Chat({
            participants: [userId, targetUserId],
            messages: [],
        });
        await chat.save();
    }
    res.send(chat);
   }
   catch(err){
    console.log(err);
   }
});

module.exports = chatRouter;