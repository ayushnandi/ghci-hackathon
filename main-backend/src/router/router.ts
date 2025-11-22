import express from "express";
import publicRouter from "./public/index";
import protectedRouter from "./protected/index";
import errorHandler from "../middlewares/errorHandler";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});
router.use("/public", publicRouter, errorHandler);
router.use("/protected", requireAuth(), protectedRouter, errorHandler);

export default router;
