import mongoose, { Schema, Document } from "mongoose";

export interface Subcategory {
  _id: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface IProduct extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  img: string;
  status: number;
  delete: number;
  subcategoryId: mongoose.Schema.Types.ObjectId | Subcategory; // Allow populated objects
  categoryId: mongoose.Schema.Types.ObjectId | Category; // Allow populated objects
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  subcategoryName?: string;
  categoryName?: string;
}

const productSchema = new Schema<IProduct>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    img: { type: String },
    status: { type: Number, default: 0 }, // Active by default
    delete: { type: Number, default: 0 }, // Active by default
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
