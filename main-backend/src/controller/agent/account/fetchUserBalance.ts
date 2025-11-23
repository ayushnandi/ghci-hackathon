import axios from "axios";
import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import UserModel from "../../../models/user";

const fetchUserBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = getAuth(req);
    const dbUser = await UserModel.findOne({ clerkId: userId });
    const getAccountDetails = await axios.post(
      `${process.env.MOCK_BANK_URL}/api/user`,
      {
        userId: userId,
      }
    );

    return res.json({
      status: true,
      accounts: [{ id: getAccountDetails.data.id, bal: "" }],
    });
  } catch (error) {
    console.error("Error - fetchUserBal:", error);
    next(error);
  }
};

export default fetchUserBalance;
