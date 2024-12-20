import Product, { IProduct } from "../models/product.model";
import mongoose from "mongoose";

interface Category {
  name: string;
  _id: string;
}

export const upsertProduct = async (
  productPayload: Partial<IProduct>
): Promise<IProduct> => {
  const { id, userId, name, img, subcategoryId, categoryId, status } =
    productPayload;

  if (!userId || !name || !subcategoryId || !categoryId) {
    throw new Error(
      "Missing required fields: userId, name, subcategoryId, or categoryId."
    );
  }

  let product;
  if (id) {
    product = await Product.findByIdAndUpdate(
      id,
      { userId, name, img, subcategoryId, categoryId, status },
      { new: true, runValidators: true }
    );
    if (!product) {
      throw new Error("Product not found.");
    }
  } else {
    product = await Product.create({
      userId,
      name,
      img,
      subcategoryId,
      categoryId,
      status: 0,
    });
  }

  return product;
};

export const getProducts = async (
  userId: string,
  search: string = ""
): Promise<IProduct[]> => {
  const filter: any = { userId, delete: 0 };

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const products = await Product.find(filter)
    .populate({
      path: "subcategoryId",
      select: "name",
    })
    .populate({
      path: "categoryId",
      select: "name",
    })
    .sort({ createdAt: -1 })
    .lean();

  const productWithModifiedStructure = products.map((product: any) => {
    return {
      ...product,
      subcategoryId: product.subcategoryId?._id || product.subcategoryId,
      categoryId: product.categoryId?._id || product.categoryId,
      subcategoryName: product.subcategoryId?.name || product.subcategoryName,
      categoryName: product.categoryId?.name || product.categoryName,
    };
  });

  return productWithModifiedStructure;
};

export const deleteProduct = async (
  productId: string,
  userId: string
): Promise<boolean> => {
  const result = await Product.updateOne(
    { _id: productId, userId, delete: { $ne: 1 } },
    { $set: { delete: 1 } }
  );

  return result.modifiedCount > 0;
};

export const getProductById = async (
  userId: string,
  productId: string
): Promise<IProduct | null> => {
  const filter = { _id: productId, userId, delete: 0 };

  const product = await Product.findOne(filter)
    .populate({
      path: "subcategoryId",
      select: "name",
    })
    .populate({
      path: "categoryId",
      select: "name",
    })
    .lean();

  if (!product) return null;

  const productObj =
    product instanceof mongoose.Model ? product.toObject() : product;
  const transformedProduct = {
    ...productObj,
    subcategoryName: (productObj.subcategoryId as any).name,
    subcategoryId: (productObj.subcategoryId as any)._id,
    categoryName: (productObj.categoryId as any).name,
    categoryId: (productObj.categoryId as any)._id,
  };

  delete transformedProduct.subcategoryId.name;
  delete transformedProduct.subcategoryId._id;
  delete transformedProduct.categoryId.name;
  delete transformedProduct.categoryId._id;

  return transformedProduct as IProduct;
};
