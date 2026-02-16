const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
         maxLength: 50,
    },
    emailId: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique:true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){  //onpy works when creating new data
            if(!["male","female","others"].includes(value))
                throw new ErrorEvent("Gender not valid");
        },
    },
    photourl: {
        type: String,
        default: "https:heeloo",
    },
    about: {
        type: String,
        default: "this is a default about",
    },
    skills:{
        type: String,
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
