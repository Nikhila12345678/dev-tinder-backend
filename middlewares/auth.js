const adminauth = (req,res,next) => {
    const token = "xyz";
    const isadminauthorized = token === "xyz";
    if(!isadminauthorized){
        res.status(401).send("unauthorized access");
    }
    else{
        next();
    }
}

module.exports = {adminauth,};