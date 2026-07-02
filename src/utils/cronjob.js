const cron = require("node-cron");
const {subDays, startOfDay, endOfDay} = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

//send mail at 8am every day
cron.schedule("0 8 * * *", async () => {
    //send emails to all people who got requests the previous day
    try{
        const yesterday = subDays(new Date(), 1);
        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        const pendingRequests = await ConnectionRequestModel.find({
            status: "intrested",
            createdAt:{
                $gte: yesterdayStart,
                $lt: yesterdayEnd,
            }
        }).populate("fromUserId toUserId");
        const listOfEmails = [...new Set(pendingRequests.map(req => req.toUserId.emailId))]
        console.log(listOfEmails);
        for(const email of listOfEmails){
            try{
            const res = await sendEmail.run("New Friend Requests pending for" + " " + email, "There are so many friend requests pending, please login to devtinder accept or reject the requests");
            console.log(res);
            }
            catch(err){
                console.log(err);
            }
        }
    }
    catch(err){
        console.log(err);
    }
}) 