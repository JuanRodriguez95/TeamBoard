import express from "express";
import taskController from "../controllers/taskController.js";
import taskValidate from "../middleware/taskValidate.js";

const router = express.Router();

router.post("/registerTask",taskValidate.userTaskExisting,taskController.registerTask);
router.get("/listTask/:status?",taskValidate.userTaskExisting,taskController.listTasks);
router.delete("/deleteTask/:_id",taskController.deleteTask);
router.put("/updateTask",taskController.updateTask);



export default router;  
 