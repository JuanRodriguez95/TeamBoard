import express from "express";
import roleController from "../controllers/roleController.js";

const router = express.Router();

router.post("/registerRole",roleController.registerRol);
router.get("/listRoles",roleController.listRoles);
router.put("/deleteRole/:_id",roleController.deleteRole);
router.put("/updateRole",roleController.UpdateRole);



export default router;

