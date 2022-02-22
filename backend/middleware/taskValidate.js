import user from "../models/user.js";

const userTaskExisting = async(req,res,next) =>{
    const userId = await user.findById(req.body.userId); 
    if(!userId)
        return res.status(404).send({message:"No user register"});
    req.body.userId=userId._id;
    next();
};
 
export default {userTaskExisting}