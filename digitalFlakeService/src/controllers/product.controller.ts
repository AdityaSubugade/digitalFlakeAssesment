import { Request, Response } from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
  upsertProduct,
} from "../services/product.service";

export const upsertProductController = async (req: Request, res: Response) => {
  try {
    const userId = req.body?.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const productPayload = {
      id: req.body.id,
      userId,
      name: req.body.name,
      img: req.file?.filename,
      status: req.body.status,
      categoryId: req.body.categoryId,
      subcategoryId: req.body.subcategoryId,
    };

    const category = await upsertProduct(productPayload);
    res.status(200).json({ success: true, data: category });
  } catch (error: unknown) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const getProductsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.body?.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const search = (req.query.search as string) || "";

    const products = await getProducts(userId, search);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error fetching products: ${error}`,
    });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = req.body?.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const isDeleted = await deleteProduct(id, userId);

    if (!isDeleted) {
      res.status(404).json({
        success: false,
        message: "Product not found or already deleted.",
      });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete Product." });
  }
};

export const getProductsByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.body?.user?.id; // Extract user ID from the request
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    // Get productId from route parameters
    const { productId } = req.params;

    if (!productId) {
      res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
      return;
    }

    // Call the getProducts function to fetch the product
    const product = await getProductById(userId, productId);

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error fetching product: ${error}`,
    });
  }
};
