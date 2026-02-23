const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () =>{
    console.log("server created successfully");
});
  })   
  .catch((err) => {
    console.log("Database cannot be connected");
  });


