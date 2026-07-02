const express = require("express");
const paymentRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const {membershipAmount} = require("../utils/constants");
const {User} = require("../models/user");
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils');

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
try{
   const {membershipType} = req.body;
   const {firstName, lastName, emailId} = req.user;
   console.log(membershipType);
   console.log(membershipAmount[membershipType]);
   const order = await razorpayInstance.orders.create({
    amount: membershipAmount[membershipType] * 100,  // Amount is in currency subunits
    currency: "INR",
    receipt: "order_rcptid_11",
    notes:{
        firstName,
        lastName,
        emailId,
        membershipType,
    },
    });
    console.log(order);
    //save it in db
    const payment = new Payment({
        userId: req.user._id,
        orderId: order.id,
        status: order.status,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        notes: order.notes,
    });

    const savedPayment = await payment.save();
    //return back order details to fronten
    res.json({...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID});
}
catch(err){
    console.log(err);
    return res.status(500).json({msg: err.message});
}
})

paymentRouter.post("/payment/webhook", async (req, res) => {
    try{
        const webhookSignature = req.headers["X-Razorpay-Signature"];
      const isWebhookValid = validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.RAZORPAY_WEBHOOK_SECRET);
      if(!isWebhookValid){
        return res.status(400).json({msg: "Webhook is not valid"});
      }
      //update the payment status
      const paymentDetails = req.body.payload.payment.entity;
      const payment = await Payment.findOne({orderId: paymentDetails.order_id});
      payment.status = paymentDetails.status;
      await payment.save();

      //update the user as premium user
      const user = await User.findOne({_id: payment.userId});
      user.isPremium = true;
      user.membershipType = payment.notes.membershipType;
      await user.save();
      //return success response
      if(req.body.event == "payment.captured"){

      }
      if(req.body.event == "payment.failed"){
         
      }
      return res.status(200).json({msg: "Webhook received successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: err.message});
    }
})

module.exports = paymentRouter;