import mongoose  from "mongoose";
import task from "../models/task.js";
import user from "../models/user.js";



const registerTask = async (req, res) => {
    const{userId,name,description,url} = req.body;
    const tasksSchema = new task({
        user:userId,
        name:name,
        description:description,
        imageUrl:url,
        taskStatus:"to-do",
        dbstatus:true
    });

    const result = await tasksSchema.save();
    if(!result)
        return res.status(500).send({message:"Failed to register task"});
    
    return res.status(200).send({message:"Success register"});
    
}

const listTasks = async (req, res) => {
    const{userId}=req.body;
    const{status}=req.params;
    let taskList = await task.find({
        $and: [{user:userId},
            {taskStatus:status}]
    });
    if(taskList.length === 0)
        return res.status(404).send({message:"Not Content"});
    
    return res.status(200).send({taskList});
     
};

const deleteTask = async (req, res) => {
    const{_id}=req.params;
    const taskDeleted = await task.findByIdAndDelete(_id);

    return !taskDeleted
     ? res.status(400).send({ message: "Error deleting task" })
     : res.status(200).send({ message: "Task deleted" });

};

const updateTask = async (req, res) => {
    const{_id,taskStatus,imageUrl}=req.body;
    const status =["to-do","in-progress","finish"];
    if(!status.includes(taskStatus))
        return res.status(400).send({message:"Invalid Status"});
    const taskUpdated = await task.findByIdAndUpdate(_id,{
        taskStatus:taskStatus,
        imageUrl:imageUrl
    });

    return !taskUpdated
     ? res.status(400).send({ message: "Error Updating task" })
     : res.status(200).send({ message: "Success Update" });

}

//const registerUser = async (req, res) => {}

export default {deleteTask,listTasks,registerTask,updateTask};