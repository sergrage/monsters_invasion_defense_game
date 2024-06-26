import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

type User = {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  email: string;
  avatar: string;
};

// add user data to request
declare global {
  namespace Express {
    interface Request {
      userData: User;
    }
  }
}

// check auth, if user is authorized => continue
export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  let cookies = req.headers.cookie;

  try {
    if (!cookies) {
      throw new Error("No cookies found!");
    }

    // check auth cookies
    const response = await fetch("https://ya-praktikum.tech/api/v2/auth/user", {
      method: "GET",
      headers: {
        Cookie: cookies,
      },
    });

    if (response.ok) {
      // add user data to request
      const data = await response.json();
      req.userData = data;

      next();
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    return res.status(403).json({
      message: (error as Error).message || "Something went wrong",
      status: 403,
    });
  }
};
