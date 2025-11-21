import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clerkId, email, firstName, lastName, image } = req.body;

    if (!clerkId) {
      return res.status(400).json({ error: "clerkId is required" });
    }

    const user = await UserModel.findOneAndUpdate(
      { clerkId },
      { email, firstName, lastName, image },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      status: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error - updateUser:", error);
    next(error);
  }
};

export default updateUser;
