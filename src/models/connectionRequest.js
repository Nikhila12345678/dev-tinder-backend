const mongoose  = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type : String,
        required : true,
        enum:{
        values: ["accepted", "rejected", "ignored", "intrested"],
        message: `{VALUE} is incorrect status type`,
    },
},
},
 { timestamps: true }

);

//adding index to fromuserid and touserid if we didnt add it will too slow to find ids 

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});


connectionRequestSchema.pre("save", function(){
    const connectionRequest = this;
    //check if fromuserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");
    }
});

const ConnectionRequest = new mongoose.model(
    "ConnectionRequest", connectionRequestSchema
);
module.exports = ConnectionRequest;