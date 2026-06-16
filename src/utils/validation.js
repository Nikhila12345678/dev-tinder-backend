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
    try{
    const allowedEditFields = ["firstName","lastName","about", "photourl", "skills", ];
    const isEditallowed = Object.keys(req.body).every(field => (
        allowedEditFields.includes(field)) );
        return isEditallowed;
     }
    catch(err){
            throw new Error("Invalid Edit Request");
        }
}

module.exports = {
    validateSignupdata,
    validateEditProfiledata,                            
}
