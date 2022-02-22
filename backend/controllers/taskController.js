import mongoose  from "mongoose";
import task from "../models/task.js";
import user from "../models/user.js";


/**
 * Registro de tarea
 * @param {*} req  Se requiere el id del usuario previamente registrado en DB jutno co los demas datos
 * necesarios para el registro.
 * @param {*} res 
 * @returns 
 */
const registerTask = async (req, res) => {
    const{userId,name,description,url} = req.body;
    if(!userId || !name || !description || !url)
        return res.status(400).send({message:"Incomplete Data"});
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

/**
 * Listar tareas
 * @param {*} req se requiere el id del usuario al que se desea consultar sus tareas, este debe ir en el body de la peticion, en el parametro por url se indica el estado por el que se desea que las tareas sean listadas (to-do, in-progress y finish).
 * @param {*} res 
 * @returns 
 */
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

/**
 * eliminar tareas
 * @param {*} req se requiere el id de la tarea que se va a eliminar
 * @param {*} res 
 * @returns 
 */
const deleteTask = async (req, res) => {
    const{_id}=req.params;
    const taskDeleted = await task.findByIdAndDelete(_id);

    return !taskDeleted
     ? res.status(400).send({ message: "Error deleting task" })
     : res.status(200).send({ message: "Task deleted" });

};

/**
 * Listar tareas
 * @param {*} req se requiere el id de la tarea a actualizar junto a los datos que pueden ser editados
 * (taskStatus e imageUrl). el taskStatus debe coincidir con los estados permitidos.
 * ("to-do","in-progress","finish")
 * @param {*} res 
 * @returns 
 */
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

export default {deleteTask,listTasks,registerTask,updateTask};