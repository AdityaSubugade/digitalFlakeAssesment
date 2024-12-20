import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { verifyToken } from "../utils/jwt.util";
import jwt from "jsonwebtoken";

const authService = new AuthService();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, phoneNumber, password } = req.body;

      // Check if user already exists
      const userExists = await authService.checkIfUserExists(email);
      if (userExists) {
        res.status(400).json({ message: "Email is already registered" });
        return;
      }

      // Register user
      const newUser = await authService.register({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const token = await authService.login(email, password);

      res.status(200).json({
        message: "Login successful",
        token: token?.token,
      });
    } catch (error) {
      res.status(401).json({ message: "Invalid email or password" });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
      }

      const userId = req.body?.user;
      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const decoded = verifyToken(token);

      if (!decoded) {
        res.status(401).json({ message: "Invalid or expired token" });
        return;
      }

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      res
        .status(200)
        .json({ message: "Password reset link sent to your email." });
    } catch (error: unknown) {
      res.status(400).json({ message: error });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { resetToken, newPassword } = req.body;
      await authService.resetPassword(resetToken, newPassword);
      res
        .status(200)
        .json({ message: "Password has been reset successfully." });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
