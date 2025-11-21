import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Creating/updating user:");
    const { clerkId, username, email, firstName, lastName, image } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingEmailUser = await UserModel.findOne({ email });
      if (existingEmailUser && existingEmailUser.clerkId !== clerkId) {
        return res.status(400).json({ error: "Email already exists for another user" });
      }


    const user = await UserModel.findOneAndUpdate(
      { clerkId }, // query by unique field
      { email, firstName, lastName, username, image },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      status: true,
      message: "User created/updated successfully",
    });
  } catch (error) {
    console.error("Error - createUser:", error);
    next(error);
  }
};

export default createUser;
