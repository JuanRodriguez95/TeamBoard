import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref:"users"},
    name:String,
    description:String,
    taskStatus:String,
    imageUrl:String,
    registerDate:{type:Date,default:Date.now},
    dbstatus:Boolean
});

const task = mongoose.model("tasks",taskSchema);
export default task;