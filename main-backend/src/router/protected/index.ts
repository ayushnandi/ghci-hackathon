import express from "express";
import userRouter from "./routes/user";

const router = express.Router();

router.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});
router.use("/user", userRouter);

export default router;
