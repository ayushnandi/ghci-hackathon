import express from "express";
import getUser from "../../../controller/user/getUser";
import createUser from "../../../controller/user/createUser";
import updateUser from "../../../controller/user/updateUser";
import deleteUser from "../../../controller/user/deleteUser";

const router = express.Router();

router.get("/", getUser);
router.put("/", updateUser);
router.post("/", createUser);
router.delete("/", deleteUser);

export default router;
