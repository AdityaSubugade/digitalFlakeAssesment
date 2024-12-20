import mongoose, { Schema, Document } from "mongoose";

export interface ISubCategory extends Document {
  categoryId: mongoose.Types.ObjectId;
  name: string;
  img: string;
  status: number;
  delete: number;
  userId: mongoose.Schema.Types.ObjectId;
}

const SubCategorySchema = new Schema<ISubCategory>(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    img: { type: String },
    status: { type: Number, default: 0 },
    delete: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SubCategory = mongoose.model<ISubCategory>(
  "SubCategory",
  SubCategorySchema
);
