import express from "express";
import getUser from "../../../controller/user/getUser";

const router = express.Router();

router.get("/", getUser);

export default router;
