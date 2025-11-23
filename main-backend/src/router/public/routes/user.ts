import express from "express";
import createUser from "../../../controller/user/createUser";
import updateUser from "../../../controller/user/updateUser";
import deleteUser from "../../../controller/user/deleteUser";

const router = express.Router();

router.put("/", updateUser);
router.delete("/", deleteUser);
router.post("/", createUser);

export default router;
