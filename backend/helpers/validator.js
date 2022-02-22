
import user from "../models/user.js";
import rol from "../models/role.js";

export const userValidator = (req) =>{
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.address || !req.body.phone || !req.body.role){
        return false;
    }else{
        return true;
    }
}




