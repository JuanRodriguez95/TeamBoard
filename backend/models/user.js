import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:String,
    phone:String,
    role:{type: mongoose.Schema.ObjectId, ref:"roles"},
    registerDate:{type: Date,default:Date.now},
    dbstatus:Boolean
});

const user = mongoose.model("users",userSchema);
export default user;