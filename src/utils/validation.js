const validator = require("validator");

const validateSignupdata = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    
    if(!firstName || !lastName){
        throw new Error("Name is not valid!");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("set strong password");
    }
}

const validateEditProfiledata = (req) => {
    const allowedEditFields = ["firstName","lastName","emailId","photourl","gender"];
    const isEditallowed = Object.keys(req.body).every(field => (
        allowedEditFields.includes(field)) ) ;
        return isEditallowed;
     }


module.exports = {
    validateSignupdata,
    validateEditProfiledata,
}
