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

    if (!userId) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const dbUser = await UserModel.findOne({ clerkId: userId });

    // ❗ Dummy mock-bank call (you will later replace this)
    // const mockBankResponse = await axios.post(
    //   `${process.env.MOCK_BANK_URL}/api/user`,
    //   { userId }
    // );

    // TEMPORARY MOCK RESPONSE:
    const mockBankResponse = {
      data: {
        id: "acc_123456",
        balance: 4200.55,
        currency: "USD",
      },
    };

    return res.json({
      status: true,
      accounts: [
        {
          id: mockBankResponse.data.id,
          bal: mockBankResponse.data.balance,
          currency: mockBankResponse.data.currency,
        },
      ],
    });
  } catch (error) {
    console.error("Error - fetchUserBalance:", error);
    next(error);
  }
};

export default fetchUserBalance;
