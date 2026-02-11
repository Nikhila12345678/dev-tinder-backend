const mongoose  = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect(
      "mongodb+srv://nikhilakodigudla_db_user:nikhila123@namastenode.nxthtvl.mongodb.net/DevTinder?appName=Namastenode")
    }

module.exports = {connectDB}; 
