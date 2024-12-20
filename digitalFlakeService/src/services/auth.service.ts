import bcrypt from "bcrypt";
import User from "../models/user.model";
import { generateToken } from "../utils/jwt.util";
import { IUser } from "../utils/interfaces/all.interfaces";
import { sendEmail } from "../utils/mailer.util";
import { v4 as uuidv4 } from "uuid";
import PasswordReset from "../models/passwordReset.model";

export class AuthService {
  async register(userData: IUser) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const newUser = new User({
      ...userData,
      password: hashedPassword,
    });

    return await newUser.save();
  }

  async checkIfUserExists(email: string): Promise<boolean> {
    const user = await User.findOne({ email });
    return !!user;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ token: string } | null> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = generateToken({ id: user._id, email: user.email });
    return { token };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const resetToken = uuidv4();

    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1); // Token valid for 1 hour

    const passwordReset = new PasswordReset({
      userId: user._id,
      resetToken,
      expiresAt: expirationTime,
    });

    await passwordReset.save();

    // Send password reset email
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `Click on the link to reset your password: ${resetLink}`;

    await sendEmail(email, "Password Reset Request", message);
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    // Find the reset token
    const passwordReset = await PasswordReset.findOne({ resetToken });

    if (!passwordReset) {
      throw new Error("Invalid or expired reset token");
    }

    // Check if the token has expired
    if (passwordReset.expiresAt < new Date()) {
      throw new Error("Reset token has expired");
    }

    const user = await User.findById(passwordReset.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    await PasswordReset.deleteOne({ resetToken });
  }
}
