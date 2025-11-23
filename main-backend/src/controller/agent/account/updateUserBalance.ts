import axios from "axios";
import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

const updateUserBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const { amount } = req.body;

    // ❗ Later you will call mock bank like:
    // await axios.post(`${process.env.MOCK_BANK_URL}/api/updateBalance`, {
    //   userId,
    //   amount,
    // });

    // TEMPORARY DUMMY UPDATED BALANCE:
    const updatedBalance = 4200.55 + (amount || 0);

    return res.json({
      status: true,
      message: "Balance updated successfully (dummy)",
      newBalance: updatedBalance,
    });
  } catch (error) {
    console.error("Error - updateUserBalance:", error);
    next(error);
  }
};

export default updateUserBalance;
