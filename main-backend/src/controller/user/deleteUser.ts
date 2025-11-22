import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clerkId } = req.body;

    if (!clerkId) {
      return res.status(400).json({ error: "clerkId is required" });
    }

    const user = await UserModel.findOneAndDelete({ clerkId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error - deleteUser:", error);
    next(error);
  }
};

export default deleteUser;
