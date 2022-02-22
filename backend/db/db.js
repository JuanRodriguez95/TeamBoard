import mongoose from "mongoose";

const db_connection = async () =>{
    try {
        //console.log(process.env.DB_CONNECTION);
        await mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Success Connection with MongoDB :  OK");
    } catch (e) {
        console.log("Error connecting with MongoDB: \n",e);
    }
};

export default { db_connection }