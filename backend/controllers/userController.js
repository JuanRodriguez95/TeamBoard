import user from "../models/user.js";
import rol from "../models/role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

import { userValidator } from "../helpers/validator.js";
// import {responseConstructor} from "../helpers/response.js";
import role from "../models/role.js";

const registerUser = async (req, res) => {
  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    address: req.body.address,
    phone: req.body.phone,
    role: req.body.role,
    dbstatus: true,
  });

  const result = await userSchema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register role" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (error) {
    return res.status(500).send({ message: "Register error" });
  }
};

//----------------------------------------------------------------
const listUser = async (req, res) => {
  let users = await user
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbstatus: "true" }],
    })
    .populate("role")
    .exec();
  if (users.length === 0)
    return res.status(404).send({ message: "No search results" });

  return res.status(200).send({ users });
};

//------------------------------------------------------
const listUserAdmin = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  if (users.length === 0)
    return res.status(404).send({ message: "No search results" });

  return res.status(200).send({ users });
};

//---------------------------------------------------------

const login = async (req, res) => {
  const { email, password } = req.body;

  const userLogin = await user.findOne({ email: email });
  if (!userLogin)
    return res.status(404).send({ message: "Incorrect Email or password" });

  const userDbStatus = await user.findOne({ dbstatus: true });
  if (!userDbStatus) return res.status(403).send({ message: "Disabled user" });

  const passhash = await bcrypt.compare(password, userLogin.password);

  if (!passhash)
    return res.status(403).send({ message: "Incorrect Email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (error) {
    return res.status(400).send({ message: "Login JWT Error" });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.params;
  if (!_id) return res.status(400).send({ message: "Imcomplete Data" });

  const users = await user.findByIdAndUpdate(_id, {
    dbstatus: false,
  });

  return !users
    ? res.status(400).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted" });
};

//---------------------------------------------------------------

const updateUserAdmin = async (req, res) => {
  const { _id, name, address, phone, role, email, password } = req.body;
  if (!_id || !name || !address || !phone || !role || !email) {
    return res.status(400).send({ message: "Incomplete Data" });
  }

  let pass = "";
  if (!password) {
    const findUser = await user.findOne({ email: email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(password, 10);
  }

  const editUser = await user.findByIdAndUpdate(_id, {
    name: name,
    address: address,
    phone: phone,
    password: pass,
    role: role,
  });

  return !editUser
    ? res.status(500).send({ message: "Error editing user" })
    : res.status(202).send({ message: "Success Update" });
};

export default {
  registerUser,
  listUser,
  login,
  deleteUser,
  updateUserAdmin,
  listUserAdmin,
};

// const deleteUser = async (req, res) => {
//   //const { _id } = req.body;
//   if (!req.params["_id"]) return res.status(400).send({ message: "Imcomplete Data" });

//   const users = await user.findByIdAndDelete(_id);

//   return !users
//     ? res.status(400).send({ message: "Error deleting user" })
//     : res.status(200).send({ message: "User deleted" });
// };
