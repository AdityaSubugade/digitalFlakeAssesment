import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
  // Attach user info to request
  req.body = {
    ...req.body,
    user: decoded,
  };
  console.log(req.body, "req.body");
  next();
};
