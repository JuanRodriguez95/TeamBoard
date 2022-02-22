import role from "../models/role.js";
import { responseConstructor } from "../helpers/response.js";

const registerRol = async (req, res) => {
    if (!req.body.name || !req.body.description)
        return res.status(400).send({ message: "Incomplete data" });

    let schema = new role({
        name: req.body.name,
        description: req.body.description,
        dbStatus: true,
    });

    let result = await schema.save();
    if (!result) {
        console.log(res.status(500).send({ message: "Failed to register role" }));
        return res.status(500).send({ message: "Failed to register role" });
    }
    return res.status(200).send({ result });
};

const listRoles = async (req, res) => {
    
    let roles = await role.find();
    if (roles.length === 0)
        return res.status(404).send({ message: "Data not found" });
    return res.status(200).send({ roles });
};

//------------------------------------------------

const deleteRole = async (req, res) => {
    if(!req.params["_id"])
    return res.status(400).send({message:"Incomplete Data"});

    const roleAux = await role.findByIdAndUpdate(req.params["_id"],{
        dbStatus:false
    });

    return !roleAux
    ? res.status(500).send({ message: "Error Deleting role" })
    : res.status(202).send({ message: "Success Delete" });
};

//-------------------------------------------------
const UpdateRole = async (req, res) => {
    const {_id,name,description}=req.body;
    if(!_id)
        return res.status(400).send({message:"Invalid Data"});
    const roles = await role.findByIdAndUpdate(_id,{
        name:name,
        description:description
    });
    return !roles
    ? res.status(500).send({message:"Updating Error"})
    : res.status(200).send({message:"Success Update"});
};
export default { registerRol, listRoles, deleteRole, UpdateRole };
