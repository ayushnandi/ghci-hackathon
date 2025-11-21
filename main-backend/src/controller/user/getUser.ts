import { clerkClient, getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);

    const clerkUser = await clerkClient.users.getUser(userId!);
    const dbUser = await UserModel.findOne({ clerkId: userId });

    return res.json({
      status: true,
      user: {
        clerk: {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          image: clerkUser.imageUrl,
        },
        db: dbUser,
        temp: "Fetched"
      },
    });
  } catch (error) {
    console.log("Error - getUser: ", error);
    next(error);
  }
};

export default getUser;
