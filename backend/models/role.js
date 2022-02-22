import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name:String,
    description: String,
    resgisterDate: {type:Date,default: Date.now}, //fecha automatica del registro
    dbStatus: Boolean,
});

const role = mongoose.model("roles",roleSchema);

export default role;