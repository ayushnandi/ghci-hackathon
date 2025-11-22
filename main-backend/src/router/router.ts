import express from "express";
import publicRouter from "./public/index";
import protectedRouter from "./protected/index";
import errorHandler from "../middlewares/errorHandler";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: true,
    route: "/",
  });
});

router.use("/public", publicRouter, errorHandler);
router.use("/protected", protectedRouter, errorHandler);

export default router;
