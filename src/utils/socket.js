const socket = require("socket.io");
const Chat = require("../models/chat");

const initializeSocket = (server) => {
    const io = socket(server,{
      cors: {
        origin: "http://localhost:5173"
      }
    }
    );
    
    io.on("connection", (socket) => {
      socket.on("joinChat", ({userId, targetUserId}) => {
        const roomId = [userId, targetUserId].sort().join("_");
        console.log(roomId);
        socket.join(roomId);
      });
      socket.on("sendMessage", async ({firstName, userId, targetUserId, message}) => {
        const roomId = [userId, targetUserId].sort().join("_");
        try{
            let chat = await Chat.findOne({
                participants: {$all: [userId, targetUserId]},
            });
    
        if(!chat){
            chat = new Chat({
                participants:[userId, targetUserId],
                messages:[],
            });
        }
        chat.messages.push({
            senderId: userId,
            text: message});
        
        await chat.save();
        io.to(roomId).emit("messageReceived", {firstName, message});
        console.log({firstName , message});
        }
        catch(err){
            console.log(err);
        }
      });
      socket.on("disconnect", () => {});
    });
}

module.exports = initializeSocket;