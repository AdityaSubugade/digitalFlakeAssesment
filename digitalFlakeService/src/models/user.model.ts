import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../utils/interfaces/all.interfaces";

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUserModel>("User", UserSchema);
