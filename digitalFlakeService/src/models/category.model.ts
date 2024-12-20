import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  img: string;
  status: number; // 0: Active, 1: Inactive
  delete: number; // 0:Active, 1: Inactive
}

const CategorySchema = new Schema<ICategory>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    img: { type: String, required: true },
    status: { type: Number, default: 0 },
    delete: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
