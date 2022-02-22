import express from "express";
import userController from "../controllers/userController.js";
import userValidate from "../middleware/userValidate.js";
import rolValidate from "../middleware/rolValidate.js";


const router = express.Router();

// router.post("/registerUser/:email/:idAnimal",(req,res)=>{
//     res.status(200).send({ message: req.params.email +  req.params.idAnimal });
// });

router.post("/registerUser",userValidate.userValidator,rolValidate.existingRole, userController.registerUser); 


router.get("/listUsers/:name?",userController.listUser);

router.get("/listUsersAdmin/:name?",userController.listUserAdmin);


router.post("/login",userController.login);

router.put("/deleteUser/:_id",userController.deleteUser);

router.put("/updateUser",userController.updateUserAdmin);



export default router; 