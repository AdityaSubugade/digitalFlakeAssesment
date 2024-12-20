import { Schema, model, Document } from "mongoose";
import { IPasswordReset } from "../utils/interfaces/all.interfaces";

const PasswordResetSchema = new Schema<IPasswordReset>({
  userId: { type: String, required: true },
  resetToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const PasswordReset = model<IPasswordReset>(
  "PasswordReset",
  PasswordResetSchema
);

export default PasswordReset;
