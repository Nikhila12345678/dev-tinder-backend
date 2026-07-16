require("dotenv").config();
require("./utils/cronjob");
const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./utils/socket");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


const server = http.createServer(app);
initializeSocket(server);

app.use(express.json());
app.use(cookieparser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);


connectDB()
  .then(() => {
    console.log("Database connection established");
    server.listen(3000, () =>{
    console.log("server created successfully");
});
  })   
  .catch((err) => {
    console.log("Database cannot be connected"); 
  });


